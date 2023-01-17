import { useMetadataByMetadataId } from '../../hooks/useMetadatabyMetadataId';
import { SelectedNft } from '../../types/types';
import { BuyModalInfo } from './BuyModalInfo';
import { BuyModalTemplate } from './BuyModalTemplate';

function BuyModal({
  closeModal,
  item,
}: {
  closeModal: () => void;
  item: SelectedNft;
}): JSX.Element {
  const { metadataId } = item;

  const modalInfo = useMetadataByMetadataId({ metadataId });

  // if (isTokenListLoading) {
  //   return (
  //     <BuyModalTemplate closeModal={closeModal}>
  //       <LoadingSaleCard />
  //     </BuyModalTemplate>
  //   );
  // }

  // const modalInfo = {
  //   amountAvailable,
  //   tokensTotal,
  //   price,
  //   prices,
  //   tokenId,
  //   tokenList,
  //   tokenData,
  //   isTokenListLoading,
  //   metadataId,
  //   tokenKey,
  //   marketId,
  //   nftContractId,
  // };

  return (
    <BuyModalTemplate closeModal={closeModal}>
      <BuyModalInfo data={modalInfo} />
    </BuyModalTemplate>
  );
}

export default BuyModal;
