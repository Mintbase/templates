export const SERVER_WALLET_ID = process.env.SERVER_WALLET_ID
export const SERVER_WALLET_PK = process.env.SERVER_WALLET_PK
export const NETWORK = process.env.NETWORK || 'testnet'
export const WALLET_AUTO_IMPORT_URL = `https://${NETWORK + "."}wallet.mintbase.xyz/import/private-key#`
export const WALLET_DEEP_LINK = `https://${NETWORK + "."}wallet.mintbase.xyz/sign-transaction?transactions_data=`

export const NFT_CONTRACT = process.env.NEXT_PUBLIC_NFT_CONTRACT
export const REFERENCE_URL = process.env.NEXT_PUBLIC_REFERENCE_URL
export const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL
export const CALLBACK_URL = process.env.NEXT_PUBLIC_CALLBACK_URL