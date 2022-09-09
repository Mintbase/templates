import { LoadingNfts, NftCard } from './NftCard';

import useStoreNfts from '../hooks/useStoreNfts';
import { StoreNfts } from '../types/types';

export const Gallery = (): JSX.Element => {
  const { nfts, loading, error } = useStoreNfts();

  if (error.length > 0) {
    return (
      <>
        <p className="text-red-500 text-center mt-8">{error}</p>
        <p className="text-center mt-8">please set on your env file.</p>
      </>
    );
  }

  return (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4 my-12">
      {loading ? (
        <LoadingNfts />
      ) : (
        nfts?.map((nft: StoreNfts, i:number) => (
          <NftCard key={`${nft.title}-${i}`} nft={nft} />
        ))
      )}
    </div>
  );
};
