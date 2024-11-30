"use client"

import { useState } from "react";
import { useMbWallet } from "@mintbase-js/react";
import type { NearContractCall,FinalExecutionOutcome,NearExecuteOptions, ExecuteArgsResponse } from "@mintbase-js/sdk";
import { MAX_GAS,execute } from "@mintbase-js/sdk";
import axios from "axios";
import type {
  CodeResult,
} from "near-api-js/lib/providers/provider";
import { providers } from "near-api-js";


const useMintImage = () => {
  const { selector, activeAccountId } = useMbWallet();
  const [preview, setPreview] = useState<string | File>("");
  const [fileImg, setFileImg] =  useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [totalProject, setTotalProject] = useState<any>(null);

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

  const onSubmit = async() =>{
    const API_KEY = "f58e5e06f2237d84a512"
    const API_SECRET = "ab97b3cec17547f9b41cc160bf915c6eb0eefff355a77ffdf59091c410ea129a"
    const formData = new FormData()
    formData.append("file",fileImg)
    // the endpoint needed to upload the file
    const url =  `https://api.pinata.cloud/pinning/pinFileToIPFS`

    const response = await axios({
      method: "post",
      url: url,
      data: formData,
      headers: {
        "Content-Type": `multipart/form-data`, 
        'pinata_api_key': API_KEY,
        'pinata_secret_api_key': API_SECRET
      }
    })

    console.log("res ipfs",response);

    const handleUpdateMetadata: NearContractCall<ExecuteArgsResponse> = {
      signerId: activeAccountId as string,
      contractAddress: "nft_delegate.joychi.testnet",
      methodName: "nft_mint",
      args:{
        token_id: (Number(totalProject)+1).toString(),
        metadata:{
          title: title,
          description: description,
          media: response.data.IpfsHash, 
          issued_at: Date.now(),
        },
        receiver_id: activeAccountId
      },
      gas: MAX_GAS,
      //6730000000000000000000
      deposit: "10000000000000000000000",
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

  return { onSubmit, preview, setPreview,setFileImg, setDescription, setTitle };
};

export default useMintImage;