import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const GET_STORE = gql`
  query GetStore($contractAddress: String!) {
    store(where: { id: { _eq: $contractAddress } }) {
      tokens(distinct_on: thingId, where: { burnedAt: { _is_null: true } }, limit: 20) {
        thingId
        thing {
          metadata {
            media
          }
        }
      }
    }
  }
`;

export type Product = {
  coverImageUrl: string;
};

type Token = {
  thingId: string;
  thing: {
    metadata: {
      media: string;
    };
  };
};

const useGalleryController = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const { loading } = useQuery(GET_STORE, {
    variables: {
      contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    },
    onCompleted: (data) => {
      const store = data?.store[0];

      if (store) {
        const products: Product[] = store.tokens.map((token: Token) => {
          return {
            coverImageUrl: token?.thing?.metadata?.media,
          };
        });

        setProducts(products);
      }
    },
  });

  return { products, loading };
};

export default useGalleryController;
