import { EIconName, MbThingCard } from 'mintbase-ui';
import { StoreNfts } from '../types/types';
import { parseMedia } from '../utils';
import { getCachedImage } from '../utils/getCachedImages';

function Item({
  item,
  showModal,
}: {
  item: StoreNfts;
  showModal: (item: StoreNfts) => void;
}): JSX.Element {
  const { mediaUrl } = parseMedia(item.media, item.base_uri);

  return (
    <>
      <MbThingCard
        cardInfo={{
          centerElement: (
            <div className="w-full relative object-cover">
              {mediaUrl ? (
                <img
                  src={getCachedImage(mediaUrl)}
                  alt={item.title}
                  className="rounded"
                />
              ) : (
                <div className="w-full h-72 mb-10 flex justify-center items-center">
                  {' '}
                  No Nft Media Available
                </div>
              )}
            </div>
          ),
          midLeftText: item.title,
          midRightText: '',
          botRightIcon: EIconName.NONE,
          onCenterElementClick: () => showModal(item),
        }}
      />
      {/* <div className="bg-white rounded shadow-lg p-4 relative"> */}
      {/* <div className="w-full h-72 mb-10 relative object-cover">
        {mediaUrl ? (
          <Image
            src={getCachedImage(mediaUrl)}
            alt={item.title}
            layout="fill"
          />
        ) : (
          <div className="w-full h-72 mb-10 flex justify-center items-center">
            {" "}
            No Nft Media Available
          </div>
        )}
      </div>
      <div>
        <div className="text-xl text-gray-800 font-bold">
          {item.title ?? "No Nft Title"}
        </div>
        <div className="text-sm">{item.storeId}</div>
      </div> */}
      {/* <div className="flex items-center mt-2 justify-end">
        <MbButton onClick={() => showModal(item)} label="BUY NOW" />
      </div> */}
      {/* </div> */}
    </>
  );
}

function LoadingItem(): JSX.Element {
  const products = Array.from(Array(12).keys());

  return (
    <>
      {products.map((productKey) => (
        <div key={productKey} className="flex items-center justify-center ">
          <div className="w-full h-64 bg-slate-900 animate-pulse" />
        </div>
      ))}
    </>
  );
}

export { Item, LoadingItem };
