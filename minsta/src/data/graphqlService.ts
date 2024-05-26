import { nearEndpoints } from "./network";
import { constants } from "@/constants";
import { extractErrorMessage } from "@/providers/data";
import request from "graphql-request";
import { toast } from "react-hot-toast";

export type GqlFetchResult<T> = {
  data?: T;
  error?: unknown;
};

export const graphqlQLServiceNew = async <T>({
  query,
  variables,
  network,
}: {
  query: string;
  variables?: Record<string, unknown>;
  network?: "testnet" | "mainnet";
}): Promise<GqlFetchResult<T>> => {
  const net = network ?? constants.network;
  const isTestnet = net === "testnet";

  const baseUrl = isTestnet
    ? nearEndpoints.testnet.graph
    : nearEndpoints.mainnet.graph;

  const headers = {
    "content-type": "application/json",
    "mb-api-key": "anon",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const data = await request(baseUrl, query, variables, headers);
    return { data: data as T };
  } catch (error: unknown) {
    const errMsg = extractErrorMessage(error as Error);

    toast.error(`src/data/graphqlService.ts \n \n Query: ${query} \n \n ${errMsg}`, {
      duration: 40000,
      position: "bottom-right",
      id:"graphQl"
    });

    throw error;
  }
};

export const graphQLService = async ({
  query,
  variables,
  network,
}: {
  query: string;
  variables?: Record<string, unknown>;
  network?: "testnet" | "mainnet";
}) => {
  try {
    const data = await graphQlFetch(query, variables, network).then(
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
  variables?: Record<string, unknown>,
  network?: "testnet" | "mainnet"
): Promise<Response> => {
  const net = network ?? constants.network;
  const isTestnet = net === "testnet";

  const baseUrl = isTestnet
    ? nearEndpoints.testnet.graph
    : nearEndpoints.mainnet.graph;

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
