import { useTokenListData } from '../../hooks/useTokenListData';
import { LoadingSaleCard } from './LoadingSaleCard';
import { BuyModalInfo } from './BuyModalInfo';
import { BuyModalTemplate } from './BuyModalTemplate';
import { SelectedNft } from '../../types/types';

function BuyModal({
  closeModal,
  item,
}: {
  closeModal: () => void;
  item: SelectedNft;
}): JSX.Element {
  const { metadataId } = item;

  const {
    price,
    prices,
    amountAvailable,
    tokensTotal,
    tokenId,
    tokenList,
    tokenData,
    tokenKey,
    marketId,
    isTokenListLoading,
    nftContractId,
  } = useTokenListData({ metadataId });

  if (isTokenListLoading) {
    return (
      <BuyModalTemplate closeModal={closeModal}>
        <LoadingSaleCard />
      </BuyModalTemplate>
    );
  }

  const modalInfo = {
    amountAvailable,
    tokensTotal,
    price,
    prices,
    tokenId,
    tokenList,
    tokenData,
    isTokenListLoading,
    metadataId,
    tokenKey,
    marketId,
    nftContractId,
  };

  return (
    <BuyModalTemplate closeModal={closeModal}>
      <BuyModalInfo data={modalInfo} />
    </BuyModalTemplate>
  );
}

export default BuyModal;
