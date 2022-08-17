import { gql, useQuery } from '@apollo/client'
import { type } from 'os'
import { useState } from 'react'

const GET_STORE = gql`
  query GetStore($contractAddress: String!) {
    store(where: { id: { _eq: $contractAddress } }) {
      tokens(
        distinct_on: thingId
        where: { burnedAt: { _is_null: true } }
        limit: 20
      ) {
        thingId
        thing {
          metadata {
            media
          }
        }
      }
    }
  }
`

export type Product = {
  coverImageUrl: string
}

type Token = {
  thingId: string
  thing: {
    metadata: {
      media: string
    }
  }
}

const useGalleryController = () => {
  const [products, setProducts] = useState<Product[]>([])

  const contractAddressEnv = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  let error = ' '
  if (typeof contractAddressEnv === 'undefined') {
    error =
      'error:  the env variable NEXT_PUBLIC_CONTRACT_ADDRESS is not set or has a invalid value'
  }

  const { loading } = useQuery(GET_STORE, {
    variables: {
      contractAddress: contractAddressEnv
    },
    onCompleted: (data) => {
      const store = data?.store[0]

      if (store) {
        const products: Product[] = store.tokens.map((token: Token) => {
          return {
            coverImageUrl: token?.thing?.metadata?.media
          }
        })

        setProducts(products)
      }
    }
  })

  return { products, loading, error }
}

export default useGalleryController
