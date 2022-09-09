import Image from 'next/image';
import { StoreNfts } from '../types/types';

const NftCard = ({ nft, key }: { nft: StoreNfts; key: string }) => {
  console.log(nft, 'nft')

  return ( 
    <div className="bg-white rounded shadow-lg p-4 relative">
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
  )
}

const LoadingProduct = (): JSX.Element => {
  const products = Array(12).fill(null)

  return (
    <>
      {products.map((_, i) => (
        <div key={i} className="flex items-center justify-center">
          <div className="w-64 h-64 bg-slate-900 animate-pulse"></div>
        </div>
      ))}
    </>
  )
}

export { NftCard, LoadingProduct }
