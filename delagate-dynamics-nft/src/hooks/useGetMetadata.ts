"use client"
import { useState } from "react";
import { useMbWallet } from "@mintbase-js/react";
import { execute, MAX_GAS } from '@mintbase-js/sdk';
import type { NearContractCall,FinalExecutionOutcome,NearExecuteOptions, ExecuteArgsResponse } from "@mintbase-js/sdk";
import axios from "axios";

const useGetMetadata = () =>{
    const { selector,activeAccountId } = useMbWallet();
    const [preview, setPreview] = useState<string | File>("");
    const [fileImg, setFileImg] =  useState<any>(null);
    const [title,setTitle]= useState<string>("");
    const [description,setDescriptionUpdate]= useState<string>("");
    const [tokenId, setTokenId] = useState<string>("");
    const [issuedAt, setIssuedAt] = useState<any>(null);

    const getWallet = async () => {
      try {
        return await selector.wallet();
      } catch (error) {
        console.error("Failed to retrieve the wallet:", error);
        throw new Error("Failed to retrieve the wallet");
      }
    };

    const handleUpdate = async() =>{
      const API_KEY = "f58e5e06f2237d84a512"
      const API_SECRET = "ab97b3cec17547f9b41cc160bf915c6eb0eefff355a77ffdf59091c410ea129a"
      const formData = new FormData()
      formData.append("file",fileImg)
      // the endpoint needed to upload the file
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`
      console.log("file",fileImg)
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
        methodName: "update_token_metadata",
        args:{
          token_id: tokenId,
          token_metadata:{
            title: title,
            description: description,
            media: response.data.IpfsHash, 
            issued_at:issuedAt,
            updated_at: Date.now()
          }
          
        },
        gas: MAX_GAS,
        deposit: "0"
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
      .then((res:FinalExecutionOutcome)=>console.log("get",res))
      .catch((err)=>console.error("err",err))
    }

    return {handleUpdate,setPreview,preview,setFileImg,setDescriptionUpdate,setTitle,setTokenId,setIssuedAt}
}
export default useGetMetadata;
