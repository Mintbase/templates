import Image from 'next/image';
import { StoreNfts } from '../types/types';

const NftCard = ({ nft}: { nft: StoreNfts; }) => (
  <div className="bg-white rounded shadow-lg p-4 relative" >
    <div className="w-full h-72 mb-10 relative object-cover">
      {nft.media ? (
        <Image
          src={nft.media}
          alt={nft.title}
          layout="fill"
        />
      ) : null }
    </div>
    <div className="">
      <div className="text-xl text-gray-800 font-bold">{nft.title}</div>
      <div className="text-sm">{nft.storeId}</div>
    </div>

  </div>
);

function LoadingNfts(): JSX.Element {
  const nfts = Array.from(Array(12).keys());

  return (
    <>
      {nfts.map((nftKey,i) => (
        <div key={`${nftKey}-${i}`} className="flex items-center justify-center ">
          <div className="w-full h-64 bg-slate-900 animate-pulse" />
        </div>
      ))}
    </>
  );
}

export { NftCard, LoadingNfts };
