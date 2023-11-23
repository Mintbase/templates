import request from "graphql-request";

export type GqlFetchResult<T> = {
  data?: T;
  error?: string;
};

export const baseUrl = "https://graph.mintbase.xyz/testnet";

export const graphqlQLService = async ({
  query,
  variables,
}: {
  query: any;
  variables?: Record<string, unknown>;
}) => {
  const headers = {
    "content-type": "application/json",
    "mb-api-key": "anon",
    "Access-Control-Allow-Origin": "*",
  };

  const queryLoad = () => request(baseUrl, query, variables, headers);

  return await queryLoad();
};

export const graphQLService = async ({
  query,
  variables,
}: {
  query: any;
  variables?: Record<string, unknown>;
}) => {
  try {
    const data = await graphQlFetch(query, variables).then(
      async (data: Response) => {
        const res = await data.json();
        return res.data;
      }
    );

    return { data };
  } catch (error) {
    console.log(error, "error");
    return { error: `Query Error: ${error}` };
  }
};

export const graphQlFetch = async (
  query: string,
  variables: any
): Promise<Response> => {
  const res = fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
    headers: {
      "content-type": "application/json",
      "mb-api-key": "omni-site",
    },
  });

  return await res;
};
