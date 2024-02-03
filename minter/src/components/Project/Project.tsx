"use client"

import { useState } from "react";
import type {
    CodeResult,
  } from "near-api-js/lib/providers/provider";
import { providers } from "near-api-js";
import useGetMetadata from "@/hooks/useGetMetadata";
import { ModalTemplate } from '@/components/Modal/Modal';
import { Input } from "@/components/ui/input";
import { getImageData } from "@/hooks/utils";
import useShareAccess from "@/hooks/useShareAccess";

export default function Success(){
    const [name, setName] = useState("");
    const [image,setImage]= useState("");
    const [isShow, setIsShow] = useState(false);
    const [description, setDescription] = useState("");
    const [totalProject,setTotalProject]= useState<any>(null);
    const [date, setDate] = useState<any>(null);
    const [updateAt, setUpdateAt] = useState<any>(null);
    const [isModal, setIsModal] = useState(false);

    const {handleUpdate,preview,setPreview,setFileImg,setDescriptionUpdate,setTitle,setTokenId,setIssuedAt} = useGetMetadata();
    const {updateOwner,setTokensId,setAccountId} = useShareAccess();

    //format date
    // const dates = new Date(date * 1000)
    // const year = dates.getFullYear();
    // const month = dates.getMonth() + 1; // Month is 0-indexed, so we add 1
    // const day = dates.getDate();
    // const hours = dates.getHours();
    // const minutes = dates.getMinutes();
    // const seconds = dates.getSeconds();

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
        setTokenId(totalProject)
        setTokensId(totalProject)
    })
   if(totalProject!=null){
    provider.query<CodeResult>({
        request_type: "call_function",
        account_id: "nft_delegate.joychi.testnet",
        method_name: "nft_token",
        args_base64: (Buffer.from(JSON.stringify({"token_id":totalProject}))).toString("base64"),
        finality: "optimistic",
    })
    .then((res:any) => {
        const petList = JSON.parse(Buffer.from(res.result).toString());
        //console.log("pet",petList)
        setName(petList.metadata.title)
        setImage(petList.metadata.media)
        setDescription(petList.metadata.description)
        setDate(petList.metadata.issued_at)
        setIssuedAt(petList.metadata.issued_at)
        setUpdateAt(petList.metadata.updated_at!=null?petList.metadata.updated_at:null)
    })
   }
   const formatDate = (format:any)=>{
    const dates = new Date(format * 1000)
    const month = dates.getMonth() + 1; // Month is 0-indexed, so we add 1
    const day = dates.getDate();
    return `${month}/${day}`;
   }
    return (
        <div className="relative">
            <div
                className="p-2 bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-300 rounded-xl shadow-xl cursor-pointer"
                
                >
                <div className="w-full relative">
                <img
                    src={`https://ipfs.io/ipfs/${image}`}
                    alt={name}
                    className="rounded-md w-full h-64 object-cover"
                />
                </div>
                <div className="flex flex-col mt-2">
                    <div className="font-semibold text-md text-black">Information</div>
                    <div className="font-semibold text-md text-black">Name: {name}</div>
                    <div className="font-semibold text-md text-black">Description: {description}</div>
                    <div className="font-semibold text-md text-black">Issued: {formatDate(date)}</div>
                    {updateAt!=null&&<div className="font-semibold text-md text-black">Updated At: {formatDate(updateAt)}</div>}
                </div>
                   
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-5">
                <button className="relative" onClick={()=>setIsShow(true)}>
                    <span className="absolute top-0 left-0 text-white mt-1 ml-1 h-full w-full rounded bg-black"></span>
                    <span className="fold-bold relative inline-block h-ful w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Update NFT</span>
                </button>
                <button className="relative" onClick={()=>setIsModal(true)}>
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Share access</span>
                </button>
            </div>
            <ModalTemplate closeModal={isModal}>
                <div className="mt-5 font-semibold text-lg text-black">Share Access</div>
                <Input onChange={(e)=>setAccountId(e.target.value)} className="mt-2 focus:outline-none focus:border-none text-black outline-none bg-white" placeholder="Enter account address" type="text"/>
                <div className="flex flex-wrap justify-center gap-6 mt-5">
                <button className="relative" onClick={()=>updateOwner()}>
                    <span className="absolute top-0 left-0 text-white mt-1 ml-1 h-full w-full rounded bg-black"></span>
                    <span className="fold-bold relative inline-block h-ful w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Share access</span>
                </button>
                <button className="relative" onClick={()=>setIsModal(false)}>
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Cancel</span>
                </button>
            </div>
            </ModalTemplate> 
            <ModalTemplate closeModal={isShow}>
                <div className="mt-5 font-semibold text-lg text-black">NFT Information</div>
                <Input onChange={(e)=>setTitle(e.target.value)} className="mt-2 focus:outline-none focus:border-none text-black outline-none bg-white" placeholder="Enter name" type="text"/>
                <Input onChange={(e)=>setDescriptionUpdate(e.target.value)} className="mt-2 focus:outline-none focus:border-none text-black outline-none bg-white" placeholder="Enter description" type="text"/>
                {preview && (
              <img
                src={preview as string}
                alt="Selected Preview"
                style={{
                  maxWidth: "330px",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
            )}
            <Input
              id="picture"
              type="file"
              onChange={(event) => {
                const { files, displayUrl } = getImageData(event);
                setPreview(displayUrl);
                setFileImg(files[0])
                console.log("file nft",files[0])
              }}
              className="mt-5 file:bg-white file:text-black bg-white text-black file:border file:border-solid file:border-grey-700 file:rounded-md"
            />
                <div className="flex flex-wrap justify-center gap-6 mt-5">
                <button className="relative" onClick={()=>handleUpdate()}>
                    <span className="absolute top-0 left-0 text-white mt-1 ml-1 h-full w-full rounded bg-black"></span>
                    <span className="fold-bold relative inline-block h-ful w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Update</span>
                </button>
                <button className="relative" onClick={()=>setIsShow(false)}>
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Cancel</span>
                </button>
            </div>
            </ModalTemplate> 
        </div>
    )
};