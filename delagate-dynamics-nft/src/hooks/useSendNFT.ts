"use client"

import { useState } from "react";
import { useMbWallet } from "@mintbase-js/react";
import type { NearContractCall,FinalExecutionOutcome,NearExecuteOptions, ExecuteArgsResponse } from "@mintbase-js/sdk";
import { MAX_GAS,execute } from "@mintbase-js/sdk";
import type {
  CodeResult,
} from "near-api-js/lib/providers/provider";
import { providers } from "near-api-js";


const useSendNFT = () => {
  const { selector, activeAccountId } = useMbWallet();
  const [totalProject, setTotalProject] = useState<any>(null);
    const [accountId, setAccountsId] = useState("");

  const provider = new providers.JsonRpcProvider({ url: "https://rpc.testnet.near.org" });
  provider.query<CodeResult>({
          request_type: "call_function",
          account_id: "nft_delegate.joychi.testnet",
          method_name: "nft_total_supply",
          args_base64: (Buffer.from(JSON.stringify({}))).toString("base64"),
          finality: "optimistic",
      })
      .then((res:any) => {
          const totalProject = JSON.parse(Buffer.from(res.result).toString());
          setTotalProject(totalProject)
      })

  const getWallet = async () => {
    try {
      return await selector.wallet();
    } catch (error) {
      console.error("Failed to retrieve the wallet:", error);
      throw new Error("Failed to retrieve the wallet");
    }
  };

  const onSendNFT = async() =>{
    const handleUpdateMetadata: NearContractCall<ExecuteArgsResponse> = {
      signerId: activeAccountId as string,
      contractAddress: "nft_delegate.joychi.testnet",
      methodName: "nft_transfer",
      args:{
        token_id: totalProject,
        receiver_id: accountId
      },
      gas: MAX_GAS,
      //6730000000000000000000
      deposit: "1",
    };

    const makeSmartContractCall = async (): Promise<FinalExecutionOutcome> => {
      const wallet = await getWallet();
      const options: NearExecuteOptions = {
        wallet,
        callbackUrl: window.location.origin
      }
      return await execute(options,handleUpdateMetadata) as FinalExecutionOutcome;
    }

    makeSmartContractCall()
    .then((res:FinalExecutionOutcome)=>console.log("res",res))
    .catch((err)=>console.error("err",err))

  }

  return { onSendNFT,setAccountsId };
};

export default useSendNFT;