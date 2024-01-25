import { bigToNear } from "@/utils/numbers";
import { StoreNftsData } from "@mintbase-js/data/lib/api/storeNfts/storeNfts.types";
import { SelectedNft } from "../types/types";
import { parseMedia } from "../utils";
import { getCachedImage } from "../utils/getCachedImages";

function Item({
  item,
  showModal,
}: {
  item: StoreNftsData;
  showModal: (item: SelectedNft) => void;
}): JSX.Element {
  if (!item) {
    return <></>;
  }

  const { base_uri, media, metadata_id, price, title } = item;

  const { mediaUrl } = parseMedia(media, base_uri);

  return (
    <div
      className="p-2 bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 rounded-xl shadow-xl cursor-pointer"
      onClick={() => showModal({ metadataId: metadata_id })}
    >
      <div className="w-full relative">
        {mediaUrl ? (
          <img
            src={getCachedImage(mediaUrl)}
            alt={title}
            className="rounded-md w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 flex justify-center items-center">
            No Nft Media Available
          </div>
        )}
      </div>
      <div className="flex flex-col mt-2">
        <div className="font-semibold text-md">{title}</div>
        <div className="text-xs">{bigToNear(price?.toString() || "0")} N</div>
      </div>
    </div>
  );
}

function LoadingItem(): JSX.Element {
  const products = Array.from(Array(12).keys());

  return (
    <>
      {products.map((productKey) => (
        <div key={productKey} className="flex items-center justify-center ">
          <div className="w-full h-72 bg-slate-900 animate-pulse rounded-xl shadow-xl" />
        </div>
      ))}
    </>
  );
}

export { Item, LoadingItem };
