import { GraphQLClient, Variables } from "graphql-request";

export type GqlFetchResult<T> = {
  data?: T;
  error?: string;
};

export const baseUrl = "https://graph.mintbase.xyz/testnet";

export const graphqlQLService = async <T>({
  query,
  variables,
}: {
  query: string;
  variables?: Variables;
}): Promise<GqlFetchResult<T>> => {
  const headers = {
    "content-type": "application/json",
    "mb-api-key": "anon",
    "Access-Control-Allow-Origin": "*",
  };

  const queryLoad = (): Promise<T> => new GraphQLClient(baseUrl, { headers }).request<T>(query, variables);

  try {
    const data = await queryLoad();
    return { data };
  } catch (error) {
    console.error(error);
    return { error: `Query Error: ${error}` };
  }
};

export const graphQLService = async <T>({
  query,
  variables,
}: {
  query: string;
  variables?: Variables;
}): Promise<GqlFetchResult<T>> => {
  try {
    const data = await graphQlFetch<T>(query, variables);
    return { data };
  } catch (error) {
    console.error(error);
    return { error: `Query Error: ${error}` };
  }
};

export const graphQlFetch = async <T>(
  query: string,
  variables?: Variables
): Promise<T> => {
  const res = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: {
      "content-type": "application/json",
      "mb-api-key": "omni-site",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json() as Promise<T>;
};