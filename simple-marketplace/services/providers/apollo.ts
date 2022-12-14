import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NETWORK_CONFIG } from '../../config/constants';

const getClient = ({ network }: { network: string }) => {
  const client = new ApolloClient({
    uri:
      network === 'mainnet'
        ? NETWORK_CONFIG.mainnet
        : NETWORK_CONFIG.testnet,
    cache: new InMemoryCache(),
  });

  return client;
};

export { getClient };
