import { StoreThing } from '../../hooks/useStoreNfts';
import { useTokenListData } from '../../hooks/useTokenListData';

import { LoadingSaleCard } from './LoadingSaleCard';
import { BuyModalInfo } from './BuyModalInfo';
import { BuyModalTemplate } from './BuyModalTemplate';
import { useNearPrice } from '../../hooks/useNearPrice';

function BuyModal({
  closeModal,
  item,
}: {
  closeModal: () => void;
  item: StoreThing;
}) {
  const { metadataId } = item;
  const { nearPrice } = useNearPrice();

  const {
    price,
    prices,
    amountAvailable,
    tokensTotal,
    tokenId,
    tokenList,
    tokenData,
    isTokenListLoading,
  } = useTokenListData({ metadataId });

  if (isTokenListLoading) {
    return (
      <BuyModalTemplate closeModal={closeModal}>
        <LoadingSaleCard />
      </BuyModalTemplate>
    );
  }

  const modalInfo = {
    amountAvailable, tokensTotal, price, prices, nearPrice, tokenId, tokenList, tokenData, isTokenListLoading,
  };

  return (
    <BuyModalTemplate closeModal={closeModal}>
      <BuyModalInfo data={modalInfo} />
    </BuyModalTemplate>

  );
}

export default BuyModal;
