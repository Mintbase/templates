export interface TokenData {
  createdAt: string;
  description: string;
  id: string;
  media: string;
  metadata_id: string;
  title: string;
}

export interface TokenFeedData {
  token: TokenData[];
}

export interface InfiniteScrollHook {
  mb_views_nft_tokens_aggregate: { aggregate: { count: string } };
  token: TokenData[];
}

export interface InfiniteScrollHookResult {
  data: InfiniteScrollHook;
}

export interface FirstTokenResult {
  tokenError: unknown;
  isLoading: boolean;
  tokensFetched: TokenData[] | null;
  newToken: TokenData | null;
}

export interface FirstTokenProps {
  newToken: TokenData | null;
  isLoading: boolean;
  firstTokenisBlocked: boolean;
  isFirstTokenError:boolean
}
