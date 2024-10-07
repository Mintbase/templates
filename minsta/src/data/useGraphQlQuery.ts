import type { QueryObserverResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { graphqlQLServiceNew } from "./graphqlService";

interface GraphQlQueryResult<T> {
  data: T | undefined;
  error: string;
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
  isFetching: boolean;
  status: "error" | "success" | "loading";
}

export interface GQLQueryOptions {
  queryName: string;
  query: string;
  variables: Record<string, any>;
  queryOpts?: any;
  queryParams?: any[];
}

export const useGraphQlQuery = <TData>({
  queryName,
  query,
  variables,
  queryOpts = {},
  queryParams = [],
}: GQLQueryOptions): GraphQlQueryResult<TData> => {
  const queryObj =
    queryParams.length > 0 ? [queryName, ...queryParams] : [queryName];

  const { data, error, isLoading, refetch, isFetching, status } = useQuery(
    queryObj,
    () => graphqlQLServiceNew<TData>({ query, variables }),
    { ...queryOpts, throwOnError: true }
  );
  return {
    data: data?.data,
    error: error as string,
    isLoading,
    refetch,
    isFetching,
    status,
  };
};
