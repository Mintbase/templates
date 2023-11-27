import type { QueryObserverResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { graphqlQLService } from "./graphqlService";

interface UseGraphQlQueryResult {
  data: any;
  error: any;
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
  isFetching: boolean;
  status: "error" | "loading" | "success";
}

export interface GQLQueryOptions {
  queryName: string;
  query: string;
  variables: Record<string, any>;
  queryOpts?: any;
  queryParams?: any[];
}

export const useGraphQlQuery = ({
  queryName,
  query,
  variables,
  queryOpts = {},
  queryParams = [],
}: GQLQueryOptions): UseGraphQlQueryResult => {
  const queryObj =
    queryParams.length > 0 ? [queryName, ...queryParams] : [queryName];

  const { data, error, isLoading, refetch, isFetching, status } = useQuery(
    queryObj,
    () => graphqlQLService({ query, variables }),
    queryOpts
  );

  return { data, error, isLoading, refetch, isFetching, status };
};
