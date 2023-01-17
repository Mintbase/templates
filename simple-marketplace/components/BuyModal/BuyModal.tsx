import { metadataByMetadataId } from '@mintbase-js/data';
import { useEffect, useState } from 'react';
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
  const [modalInfo, setModalInfo] = useState(null);
  const { metadataId } = item;

  useEffect(() => {
    // gets store nfts from mintbase-js/data package
    const getMetadata = async () => {
      const metadata = await metadataByMetadataId(metadataId);

      setModalInfo(metadata.data);
    };

    getMetadata();
  }, []);

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
