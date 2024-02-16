export const SERVER_WALLET_ID = process.env.SERVER_WALLET_ID
export const SERVER_WALLET_PK = process.env.SERVER_WALLET_PK
export const NETWORK = process.env.NETWORK || 'testnet'
export const WALLET_AUTO_IMPORT_URL = `https://${NETWORK + "."}wallet.mintbase.xyz/import/private-key#`
export const WALLET_DEEP_LINK = `https://${NETWORK + "."}wallet.mintbase.xyz/sign-transaction?transactions_data=`

export const NFT_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT || 'topsecretaiminting.mintspace2.testnet'
export const REFERENCE_URL = process.env.NEXT_PUBLIC_REFERENCE_URL || 'https://uee5hnbhczhhnbezq446vsf2z7d4l7pmtbuozffnmgksqqcjlzwq.arweave.net/oQnTtCcWTnaEmYc56si6z8fF_eyYaOyUrWGVKEBJXm0'
export const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL || '1xqQrJSsVGMlsfS29XP7bxIthodmNmbGZWS-mhHLh40'
export const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL

export const CLIENT_MINT_ARGS = {
    type: "FunctionCall",
    params: {
      methodName: "mint",
      args: {
        metadata: JSON.stringify({ reference: REFERENCE_URL, media: MEDIA_URL }),
        nft_contract_id: NFT_CONTRACT
      },
    gas: "200000000000000",
    deposit: "10000000000000000000000",        
        }
    }

export const PROXY_CONTRACT = '0.drop.proxy.mintbase.testnet'    
