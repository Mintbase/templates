import { NextResponse } from "next/server";
import { execute, createMetadata, mintOnMetadata, updateMetadata, mbjs } from '@mintbase-js/sdk'
import { callViewMethod } from '../../../../utils/utils'
import * as nearAPI from "near-api-js";
import { connect } from "@mintbase-js/auth";
import { metadata } from "@/app/page";

mbjs.config({ network: "testnet" });


export const GET = async (request: Request, data: any) => {
    if (!request) {
        throw new Error('Request is undefined');
    }

    const { params } = data;
    const { id } = params;

    console.log(id)
    if (!id) {
        return NextResponse.json(
            { error: "id is not defined" },
            { status: 500 }
        );
    }

    const response = await createUserNFT(id);

    return NextResponse.json({ response }, { status: 200 });
}


const createUserNFT = async (address: string) => {
    const extra = "ethBerlin06";
    const contractAddress = 'ethberlin04hackaton.mintspace3.testnet';

    const ACCOUNT_ID = "armsveshack.testnet";
    const NETWORK = "testnet";

    const level = [
        "https://arweave.net/HZ6e25NZdql6MhUbUuwTwaB9poOUzIqlONTa3cg8sug", 
        "https://arweave.net/PEI0-Dxbkb26PTQkzxa1xY_vdUTwdJSCS82OvciUpAQ", 
        "https://arweave.net/iobQY_A2WheJWk-yJMpQHI-fhuQ2suJQxn9fraQAwxI", 
        "https://arweave.net/5GPxsfKlBYqXeNgJ1nuRtiWTqU7F0K1EV9cybGWnQe8", 
        "https://arweave.net/fyEf-mXL70TJZ4fJ9rS1_AcN-FokSd-XrhUdNDGzurc"
    ]

    const keyStore = new nearAPI.keyStores.InMemoryKeyStore();
    
    if (!process.env.PRIVATE_KEY) {
        throw new Error('PRIVATE_KEY is not defined');
    }

    await keyStore.setKey(
        NETWORK,
        ACCOUNT_ID,
        nearAPI.KeyPair.fromString(process.env.PRIVATE_KEY)
    );

    const contractOwner = await connect("armsveshack.testnet", keyStore, NETWORK);

    try {
        const response = await callViewMethod<{ metadata: { extra: string }, token_id: string }[]>({
            contractId: "ethberlin04hackaton.mintspace3.testnet",
            method: "nft_tokens_for_owner",
            args: { account_id: address }
        });

        console.log('response', response[0].metadata.extra);
        console.log('response', response[0].token_id.split(':')[0]);
        const metadataId = response[0].token_id.split(':')[0];
        const metadata = { media: level[response[0].metadata.extra.split(',').length], extra: response[0].metadata.extra + ',' + extra };

        if (response[0].metadata.extra.split(',').includes(extra)) {
            console.log('NFT already created for this address');
            return "NFT already minted for this event!";
        } else {
            console.log('You have upgraded to level',response[0].metadata.extra.split(',').length);

            await execute({ account: contractOwner }, updateMetadata({ contractAddress, metadataId, metadata, noReference: true, }));

            return "You have upgraded to level 2!";
        }
    } catch (error) {
        console.log('error',error)

        console.log('No NFTs found for this address');

        const price = 0;
        const metadataId = Math.floor(Math.random() * 1000000).toString();
        //console.log(metadataId)
        const ownerId = address;
    
        console.log('Creating metadata')
        const creationTx = createMetadata({
            contractAddress,
            metadataId,
            metadata: { media: level[0], extra },
            isDynamic: true,
            price: price,
            noReference: true,
            maxSupply: 1,
        });
    
        console.log('Minting on metadata')
        const mintTx = mintOnMetadata({ contractAddress, metadataId, ownerId, price });
        console.log(mintTx)
        console.log('Executing')
        await execute({ account: contractOwner }, [creationTx]);
        console.log('Executing 2')
        await execute({ account: contractOwner }, mintOnMetadata({ contractAddress, metadataId, ownerId, price }));
        console.log('Done')

        return "NFT Created Successfully!"
    }

    return true;

};