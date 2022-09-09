import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Network } from 'mintbase';
import { NETWORK_CONFIG } from '../../config/constants';

const getClient = ({ network }: { network: string }) => {
  const client = new ApolloClient({
    uri:
      network === Network.mainnet
        ? NETWORK_CONFIG.mainnet
        : NETWORK_CONFIG.testnet,
    cache: new InMemoryCache(),
  });

  return client;
};

export { getClient };
