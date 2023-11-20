import { useMbWallet } from "@mintbase-js/react";
import { uploadReference } from "@mintbase-js/storage";
import { useState } from "react";
import { convertBase64ToFile } from "./base64ToFile";
import { MintbaseWalletSetup } from "@/app/layout";
import { FinalExecutionOutcome, convertGenericCallToWalletCall, mint } from "@mintbase-js/sdk";

interface ReferenceObject {
  media: File;
}

const useMintImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selector, activeAccountId } = useMbWallet();


  const getWallet = async () => {
    try {
      return await selector.wallet();
    } catch (error) {
      console.error("Failed to retrieve the wallet:", error);
      setLoading(false);
      throw new Error("Failed to retrieve the wallet");
    }
  };


  const uploadReferenceObject = async (refObject: ReferenceObject) => {
    try {
      return await uploadReference(refObject);
    } catch (error) {
      console.error("Failed to upload reference:", error);
      setLoading(false);
      throw new Error("Failed to upload reference");
    }
  };

  const performTransaction = async (
    wallet: any,
    metadata: any,
  ) => {
    if (!wallet) {
      throw new Error("Wallet is not defined.");
    }





//   const mintCall = mint({
//       contractAddress:  MintbaseWalletSetup.contractAddress,
//       ownerId: activeAccountId as string,
//       amount: 1,
//       metadata: JSON.stringify(metadata),
//     })

//        // @ts-ignore
//     mintCall.deposit = "10000000000000000000000"
    try {




//   if (reference) {
//     const mintCall = mint({
//       noMedia: true,
//       metadata: {
//         reference: reference
//       },
//       ownerId: activeAccountId
//     })

//     await executeecute({ wallet }, mintCall)


//   const receipt = (await wallet.signAndSendTransaction({
//       ...convertGenericCallToWalletCall(mintCall as any),
//     })) as void | FinalExecutionOutcome[]

        const res = await wallet.signAndSendTransaction({
        signerId: activeAccountId,
        receiverId: MintbaseWalletSetup.contractAddress,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "mint",
              args: {
                metadata: JSON.stringify(metadata),
                nft_contract_id: MintbaseWalletSetup.contractAddress,
              },
              gas: "200000000000000",
              deposit: "10000000000000000000000",
            },
          },
        ],
      });
      console.log(res, res)
 
      return  res
    } catch (error) {
      console.error("Failed to sign and send transaction:", error);
      throw new Error("Failed to sign and send transaction");
    }
  };


  const mintImage = async (photo: File) => {
    if (!activeAccountId) {
        console.log(activeAccountId, 'activeAccountId')
      setError("Active account ID is not set.");
      return;
    }

    console.log(photo, 'photo')

    setLoading(true);

    try {
      const wallet = await getWallet();
      const refObject = {
        media: photo,
      };
      const uploadedData = await uploadReferenceObject(refObject);


      
      const metadata = { reference: uploadedData?.id,  media: photo };

      console.log(wallet, uploadedData, refObject, photo, 'try')

      console.log(metadata, 'metadata')
      await performTransaction(wallet, metadata);
    } catch (error: any) {
        console.log(error, 'errror')
      setError(
        error?.message || "An error occurred during the minting process."
      );
    } finally {
      setLoading(false);
    }
  };

  return { mintImage, loading, error };
};

export default useMintImage;
