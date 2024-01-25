export enum TransactionEnum {
  MINT = 'mint',
  TRANSFER = 'transfer',
  BURN = 'burn',
  DEPLOY_STORE = 'deploy-store',
  MAKE_OFFER = 'make-offer',
  REVOKE_MINTER = 'revoke-minter',
  ADD_MINTER = 'add-minter',
  TRANSFER_STORE_OWNERSHIP = 'transfer-store-ownership',
  LIST = 'list',
  TAKE_OFFER = 'take-offer',
  WITHDRAW_OFFER = 'withdraw-offer',
}

export interface TokenDetails {price: number, tokenId: string}

export interface TokenDetailsVariant {price: number, token: { id: string } }

export interface TokenDataQuery {
  tokenData: TokenData[]
}
export interface TokenData {
  listings: TokenDetails[] | TokenDetailsVariant[],
  media: string,
  metadata_id: string,
  title: string,
  nft_contract_id: string,
  token_id:string,
  listings_aggregate: { aggregate: { count: number } }
}

export interface TokenListData {
  price: number,
  prices: TokenDetails[],
  amountAvailable: number,
  tokensTotal: number,
  tokenId:string,
  tokenList: TokenDetailsVariant[],
  tokenData: TokenData,
  isTokenListLoading: boolean,
  marketId?: string
  tokenKey?: string
  nftContractId?: string
}

export interface SelectedNft {
  metadataId: string
}

export type Store = {
  id: string
  name: string
};

export type StoreNfts = {
  base_uri: string
  createdAt: string;
  listed: boolean;
  media: string;
  storeId: string;
  metadataId: string;
  title: string;
};

export interface PriceEl {
  price: number;
}

export interface BuyModalData {
  data: TokenListData
}
