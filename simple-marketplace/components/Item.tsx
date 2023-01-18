import { StoreNftsData } from '@mintbase-js/data/lib/api/storeNfts/storeNfts.types';
import { EIconName, MbThingCard } from 'mintbase-ui';
import { SelectedNft } from '../types/types';
import { parseMedia } from '../utils';
import { getCachedImage } from '../utils/getCachedImages';

function Item({
  item,
  showModal,
}: {
  item: StoreNftsData
  showModal: (item: SelectedNft) => void
}): JSX.Element {
  const { mediaUrl } = parseMedia(item.media, item.base_uri);

  return (
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
        onCenterElementClick: () => showModal({ metadataId: item.metadata_id }),
      }}
    />
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
