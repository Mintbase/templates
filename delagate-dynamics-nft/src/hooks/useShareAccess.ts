import { useState } from "react";
import { useMbWallet } from "@mintbase-js/react";
import { execute, MAX_GAS } from '@mintbase-js/sdk';
import type { NearContractCall,FinalExecutionOutcome,NearExecuteOptions, ExecuteArgsResponse } from "@mintbase-js/sdk";

const useShareAccess = () => {
    const { selector,activeAccountId } = useMbWallet();
    const [tokenId, setTokensId] = useState<string>("");
    const [accountId, setAccountId] = useState<string>("");

    const getWallet = async () => {
        try {
          return await selector.wallet();
        } catch (error) {
          console.error("Failed to retrieve the wallet:", error);
          throw new Error("Failed to retrieve the wallet");
        }
      };

    const updateOwner = async() =>{
        const handleUpdateMetadata: NearContractCall<ExecuteArgsResponse> = {
            signerId: activeAccountId as string,
            contractAddress: "nft_delegate.joychi.testnet",
            methodName: "nft_approve",
            args:{
                token_id: tokenId,
                account_id: accountId,
            },
            gas: MAX_GAS,
            deposit: "300000000000000000000"
        };

        const checkNftIsApproved: NearContractCall<ExecuteArgsResponse> = {
            signerId: activeAccountId as string,
            contractAddress: "nft_delegate.joychi.testnet",
            methodName: "nft_is_approved",
            args:{
                token_id: tokenId,
                approved_account_id: accountId
            },
            gas: MAX_GAS,
            deposit:"300000000000000000000"
        }

        const makeSmartContractCall = async (): Promise<FinalExecutionOutcome> => {
            const wallet = await getWallet();
            const options: NearExecuteOptions = {
              wallet,
              callbackUrl: window.location.origin
            }
            return await execute(options,handleUpdateMetadata,checkNftIsApproved) as FinalExecutionOutcome;
          }
    
        makeSmartContractCall()
          .then((res:FinalExecutionOutcome)=>console.log("get",res))
          .catch((err)=>console.error("err",err))
          
    }

    return {updateOwner,setTokensId,setAccountId}
}

export default useShareAccess;
