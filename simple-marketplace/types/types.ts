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
export interface TokenDetailsVariant {price: number, token: { id: string }}

export interface TokenDataQuery {
  tokenData: TokenData[]
}
export interface TokenData {
  listings: TokenDetails[],
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
  isTokenListLoading: boolean
}

export interface BuyModalState {
  currentPrice: string,
  nftTokens: string[],
  prices: string[],
  tokens: string[],
  error: string
}

export type ReducerActions = {
  fieldName: BuyModalFieldNames,
  type: ACTIONTYPES,
  payload: any,
};
export interface HasuraThingMetadata {
  store?: {
    id?: string;
    name?: string;
    baseUri?: string;
  };
  metadata: {
    animation_type: null | string;
    animation_url: null | string;
    description: null | string;
    document: null | string;
    id: string;
    media_size: string;
    media_type: string;
    title: string;
    youtube_url: string;
    media: string;
  };
  tokens: {
    id?: string;
    minter: string;
  }[];
}

export interface HasuraThing {
  list: any;
  metadata: HasuraThingMetadata[];
  ownersCount: any;
  simpleSaleCount: any;
  rollingAuctionCount: any;
  tokens_aggregate: any;
}

export interface ListThing {
  price: string;
  tokensListedSaleCounter: number;
  tokensListedAuctionCounter: number;
  tokensTotal: number;
  tokenId: string;
}

export interface ThingMetadata {
  title: string;
  coverImage: string;
  description: string;
  animationUrl: string | null;
  animationType: string | null;
  document: string | null;
  media: string | null;
}

export interface ThingData {
  data: HasuraThing;
  tokensCounter?: number;
  tokensTotal?: number;
  price?: string;
}

export interface ThingProps {
  metadataId?: string;
  tokenId?: string;
  title?: string;
  description?: string;
  coverImage?: string;
  likesCounter?: number;
  tokensCounter?: number;
  tokensTotal?: number;
  price?: string;
  animationUrl?: string;
  descritpion?: string;
  hasMutlipleTokens?: boolean;
  metadata?: ThingMetadata;
  storeId?: string;
  tokenAmount?: number;
  tokenOwnerId?: string;
  tokenMinterId?: string;
  url?: string;
  hideMintbaseContract?: boolean;
}

export interface SimpleSaleProps {
  thingId: string;
  price: string;
  amountAvailable: number;
  totalAmount: number;
  storeId: string;
  tokenId?: string;
  loading: boolean;
}
