import type { QueryObserverResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { graphqlQLService } from "./graphqlService";

interface UseGraphQlQueryResult<TData, TError> {
  data: TData | undefined;
  error: TError | null;
  isLoading: boolean;
  refetch: () => Promise<QueryObserverResult<TData, TError>>;
  isFetching: boolean;
  status: "error" | "loading" | "success";
}

// Adjusted to be generic to match the useQuery call
type QueryOptionsType<TData, TError> = Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>;

// If queryParams is an array of specific types, define them here. For example, if they are strings:
type QueryParamsType = string[];

export interface GQLQueryOptions<TData, TError> {
  queryName: string;
  query: string;
  variables: Record<string, unknown>;
  queryOpts?: QueryOptionsType<TData, TError>;
  queryParams?: QueryParamsType;
}

export const useGraphQlQuery = <TData = unknown, TError = unknown>({
  queryName,
  query,
  variables,
  queryOpts = {},
  queryParams = [],
}: GQLQueryOptions<TData, TError>): UseGraphQlQueryResult<TData, TError> => {
  const queryObj =
    queryParams.length > 0 ? [queryName, ...queryParams] : [queryName];

  const { data, error, isLoading, refetch, isFetching, status } = useQuery<TData, TError>(
    queryObj,
    () => graphqlQLService({ query, variables }) as Promise<TData>,
    queryOpts
  );

  return { data, error, isLoading, refetch, isFetching, status };
};