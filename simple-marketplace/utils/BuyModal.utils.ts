import { TokenData } from '../types/types';

export interface QueryOptions {
  skip?: boolean;
  variables?: {
    [key: string]: Object;
  };
  onCompleted?: (data: any) => void;
}

export const mapQueryObj = (data:TokenData[]) => {
  let queryOptions: QueryOptions = { skip: true };

  if (data) {
    const tokens = data.map((token: TokenData) => token.token_id);

    if (data.length > 0) {
      queryOptions = {
        variables: { ids: tokens },
      };
    }
  }

  return { queryOptions };
};
