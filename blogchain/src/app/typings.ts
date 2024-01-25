
export interface USER_POSTS {
  metadata_id: string;
  media: string;
  title: string;
  description: string;
  minted_timestamp: string;
};

export interface USER_POST_DATA {
  mb_views_nft_tokens: USER_POSTS[] | never[]
}

export interface BLOG_POST_UNIQUE extends USER_POSTS {
    nft_contract_id: string;
    minter: string;
}

export interface BLOG_POST_DATA {
  post: BLOG_POST_UNIQUE
  isLoading: boolean;
}

export interface QUERY_RESPONSE<T> {
  mb_views_nft_tokens: T[] | never[]
  isLoading: boolean;
}

export interface HOOK_RESPONSE<T> {
  posts: T[] | never[]
  isLoading: boolean;
}

export interface BLOG_POSTS {
  posts: USER_POSTS[]
  isLoading: boolean
}

export interface BLOG_POST {
  post: USER_POSTS[] | never[]
  isLoading: boolean
}