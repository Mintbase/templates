import { ApolloClient, InMemoryCache } from "@apollo/client";

const getClient = ({ network }: { network: string }) => {
  const client = new ApolloClient({
    uri:
      network === "mainnet"
        ? "https://mintbase-mainnet.hasura.app/v1/graphql"
        : "https://mintbase-testnet.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
  });

  return client
};

export { getClient };
