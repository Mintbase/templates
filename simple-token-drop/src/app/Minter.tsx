/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react";
import { mintArgs, serverMint } from "./serverMint";
import { NearWalletConnector } from "@/components/NearWalletSelector";
import { InitialLoading, Loading, Spinner } from "@/components/Loading";
import { useMbWallet } from "@mintbase-js/react";
import { execute } from "@mintbase-js/sdk";
import { CALLBACK_URL } from "./constants";


export default function Minter() {
    const [txLoading, setTxLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const { activeAccountId, selector, isConnected } = useMbWallet();

    useEffect(() => {
        setInitialLoading(false)
    }, [])


    const handleServerMint = () => {
        setTxLoading(true);
        serverMint()
    }

    const handleClientMint = async () => {
        setTxLoading(true);
        if (!selector.wallet || !activeAccountId) {
            console.error("Failed to mint trigger mint")
            return
        }

        const wallet = await selector.wallet();
        await execute({ wallet: wallet, callbackUrl: CALLBACK_URL }, await mintArgs(activeAccountId))

    }

    if (initialLoading) return <InitialLoading />
    if (txLoading) return <Loading />

    return (
        <>
            <h1 className="text-black text-2xl font-medium">Simple token drop</h1>
            <div className="flex flex-col justify-center items-center space-y-8 text-[40px]">
                <img src="https://24njbleuvrkggjnr6s3pk473n4jc3buhmy3gnrtfms7jueolq6gq.arweave.net/1xqQrJSsVGMlsfS29XP7bxIthodmNmbGZWS-mhHLh40" alt="" />
            </div>
            {!isConnected &&
                <div className="space-x-6">
                    <NearWalletConnector />
                    <button onClick={handleServerMint} className='bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-44'>Drop to new wallet</button>
                </div>
            }

            {isConnected &&
                <div className="space-x-6">
                    <button onClick={handleClientMint} className='bg-black text-white rounded p-3 hover:bg-[#e1e1e1] w-44' > Mint</button>
                    <NearWalletConnector />
                </div >
            }
        </>
    );
}
