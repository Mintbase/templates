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
import { useMbWallet } from "@mintbase-js/react";
import useSendNFT from "@/hooks/useSendNFT";

export default function Success(){
    const [name, setName] = useState("");
    const [image,setImage]= useState("");
    const [isShow, setIsShow] = useState(false);
    const [description, setDescription] = useState("");
    const [totalNFT,setTotalNFT]= useState<number>(0);
    const [date, setDate] = useState<any>(null);
    const [updateAt, setUpdateAt] = useState<any>(null);
    const [isModal, setIsModal] = useState(false);
    const [owner, setOwner] = useState("");
    const [approvedAccountIds,setApprovedAccountIds] = useState<any>(null);
    const { activeAccountId, isConnected } = useMbWallet();
    const [isUpdateNFT, setisUpdateNFT] = useState(false);
    const [isChecked, setIsChecked] = useState(true)
    const [isUpdate, setIsUpdate] = useState(true)
    const [isShare, setIsShare] = useState(true)
    const [isBurn, setIsBurn] = useState(true)
    const [isSend, setIsSend] = useState(false)
    const [select, setSelect] = useState(false);
    const [isShareAccess, setIsShareAccess] = useState(false);
    const [isMintNFT, setIsMintNFT] = useState(true);

    const {handleUpdate,preview,setPreview,setFileImg,setDescriptionUpdate,setTitle,setTokenId,setIssuedAt} = useGetMetadata();
    const {updateOwner,setTokensId,setAccountId} = useShareAccess();
    const {onSendNFT,setAccountsId} = useSendNFT()

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
        method_name: "nft_tokens_for_owner",
        args_base64: (Buffer.from(JSON.stringify({account_id:activeAccountId}))).toString("base64"),
        finality: "optimistic",
    })
    .then((res:any) => {
        const token_id = (JSON.parse(Buffer.from(res.result).toString())).at(-1);
        const totalNFT = Object.values(token_id).length;
        setTotalNFT(totalNFT);
        setApprovedAccountIds(Object.keys(token_id.approved_account_ids).map((e)=>e))
        setOwner(token_id.owner_id)
        setName(token_id.metadata.title)
        setImage(token_id.metadata.media)
        setDescription(token_id.metadata.description)
        setDate(token_id.metadata.issued_at)
        setIssuedAt(token_id.metadata.issued_at)
        setUpdateAt(token_id.metadata.updated_at!=null?token_id.metadata.updated_at:null)
        setTokenId(token_id.token_id)
        setTokensId(token_id.token_id)
        // setTotalProject(totalProject)
    })   
   const formatDate = (format:any)=>{
    const dates = new Date(format * 1000)
    const month = dates.getMonth() + 1; // Month is 0-indexed, so we add 1
    const day = dates.getDate();
    return `${month}/${day}`;
   }
   

    return (
        <div className="relative">
            <div
                className="p-5 bg-black bg-opacity-20 transition-all duration-300 rounded-xl shadow-xl"
                >
                <div className="w-full relative">
                <img
                    src={`https://ipfs.io/ipfs/${image}`}
                    alt={name}
                    className="rounded-md w-full h-64 object-cover"
                />
                </div>
                <div className="flex flex-col mt-2">
                    <div className="font-semibold text-xl text-black">Information</div>
                    <div className="font-semibold text-md text-black">Name: {name}</div>
                    <div className="font-semibold text-md text-black">Description: {description}</div>
                    <div className="font-semibold text-md text-black">Issued: {formatDate(date)}</div>
                    {updateAt!=null&&<div className="font-semibold text-md text-black">Updated At: {formatDate(updateAt)}</div>}
                    <div className="font-semibold text-md text-black">Owner: {owner}</div>
                    <div className="font-semibold text-md text-black">Approved Access: {approvedAccountIds!=null&&approvedAccountIds}</div>
                </div>
                   
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-5">
                <button className="relative" onClick={()=>{
                    owner==activeAccountId?setIsModal(true):setIsShareAccess(true)
                }}>
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Share access</span>
                </button>
                <button className="relative" onClick={()=>{
                    if(approvedAccountIds!=null&&approvedAccountIds[0]==activeAccountId||owner==activeAccountId){setIsShow(true)} else setisUpdateNFT(true)
                }}>
                    <span className="absolute top-0 left-0 text-white mt-1 ml-1 h-full w-full rounded bg-black"></span>
                    <span className="fold-bold relative inline-block h-ful w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Update NFT</span>
                </button>
                <button className="relative" onClick={()=>{
                    if(approvedAccountIds!=null&&approvedAccountIds[0]==activeAccountId||owner==activeAccountId){setIsSend(true)}else{setSelect(true)}
                }}>
                    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
                    <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Send NFT</span>
                </button>
            </div>
            {totalNFT<1&&<ModalTemplate closeModal={isMintNFT}>
                <div className="flex flex-col">
                    <div className="mt-5 font-semibold text-2xl text-yellow-700">Information</div>
                    <span className="mt-2 font-semibold text-lg text-black text-center">Please Mint NFT before!!</span>
                    <div className="flex justify-end mt-2 mb-2 items-center">
                        <button className="relative mt-2 w-[200px]" onClick={()=>setIsMintNFT(false)}>
                        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-[200px] rounded bg-gray-700"></span>
                            <span className="fold-bold relative inline-block h-full w-[200px] rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Close</span>
                        </button>
                    </div>
                </div>
            </ModalTemplate> }
            <ModalTemplate closeModal={isSend}>
                <div className="flex flex-col">
                    <div className="mt-5 font-semibold text-2xl text-yellow-700">Send NFT</div>
                    <Input onChange={(e)=>setAccountsId(e.target.value)} className="mt-2 focus:outline-none focus:border-none text-black outline-none bg-white" placeholder="Enter account address" type="text"/>
                    <div className="flex justify-between mt-2 mb-2 items-center">
                        <button className="relative mt-2 w-[200px] " onClick={onSendNFT}>
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-[200px] rounded bg-gray-700"></span>
                            <span className="fold-bold relative inline-block h-full w-[200px] rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Send</span>
                        </button>
                        <button className="relative mt-2 w-[200px] " onClick={()=>{
                            setIsSend(false)
                        }}>
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-[200px] rounded bg-gray-700"></span>
                            <span className="fold-bold relative inline-block h-full w-[200px] rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Cancel</span>
                        </button>
                    </div>
                </div>
            </ModalTemplate> 
            <ModalTemplate closeModal={isShareAccess}>
                <div className="flex flex-col">
                    <div className="mt-5 font-semibold text-2xl text-center text-yellow-700">Notification</div>
                    <span className="mt-2 font-semibold text-lg text-black text-center">You don&apos;t have access to Share Access!!</span>
                    <div className="flex justify-center items-center">
                        <button className="relative mt-2 w-[200px] " onClick={()=>setIsShareAccess(false)}>
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-[200px] rounded bg-gray-700"></span>
                            <span className="fold-bold relative inline-block h-full w-[200px] rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Cancel</span>
                        </button>
                    </div>
                </div>
            </ModalTemplate>
            <ModalTemplate closeModal={select}>
                <div className="flex flex-col">
                    <div className="mt-5 font-semibold text-2xl text-center text-yellow-700">Notification</div>
                    <span className="mt-2 font-semibold text-lg text-black text-center">You don&apos;t have access to send NFT!!</span>
                    <div className="flex justify-center items-center">
                        <button className="relative mt-2 w-[200px] " onClick={()=>setSelect(false)}>
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-[200px] rounded bg-gray-700"></span>
                            <span className="fold-bold relative inline-block h-full w-[200px] rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Cancel</span>
                        </button>
                    </div>
                </div>
            </ModalTemplate> 
            <ModalTemplate closeModal={isUpdateNFT}>
                <div className="flex flex-col">
                    <div className="mt-5 font-semibold text-2xl text-center text-yellow-700">Notification</div>
                    <span className="mt-2 font-semibold text-lg text-black text-center">You don&apos;t have access to update NFT!!</span>
                    <div className="flex justify-center items-center">
                        <button className="relative mt-2 w-[200px] " onClick={()=>setisUpdateNFT(false)}>
                            <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-[200px] rounded bg-gray-700"></span>
                            <span className="fold-bold relative inline-block h-full w-[200px] rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-yellow-400 hover:text-black">Cancel</span>
                        </button>
                    </div>
                </div>
            </ModalTemplate> 
            <ModalTemplate closeModal={isModal}>
                <div className="mt-5 font-semibold text-2xl text-black">Share Access</div>
                <Input onChange={(e)=>setAccountId(e.target.value)} className="mt-2 focus:outline-none focus:border-none text-black outline-none bg-white" placeholder="Enter account address" type="text"/>
                
                <div className="relative mt-2">
                    <div className="p-2 bg-black bg-opacity-10 transition-all duration-300 rounded-xl shadow-xl">
                        <div className="flex relative w-full flex-col">
                            <span className="mt-2 ml-2 font-semibold text-lg text-black ">What Can This Share Access Do?</span>
                            <label className='autoSaverSwitch relative justify-between px-3 inline-flex cursor-pointer select-none items-center mt-2'>
                                <span className='label flex items-center text-lg font-medium text-black  ml-5'>
                                Send NFT
                                </span>
                                <input
                                type='checkbox'
                                name='autoSaver'
                                className='sr-only'
                                checked={isChecked}
                                onChange={(e)=>setIsChecked(!isChecked)}
                                />
                                <span
                                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                                    isChecked ? 'bg-[#2ecc71]' : 'bg-[#e84118]'
                                }`}
                                >
                                <span
                                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                    isChecked ? 'translate-x-6' : ''
                                    }`}
                                ></span>
                                </span>
                                
                            </label>
                            <label className='autoSaverSwitch relative inline-flex justify-between px-3 cursor-pointer select-none items-center mt-2'>
                                <span className='label flex items-center text-lg font-medium text-black ml-5'>
                                Update Information 
                                </span>
                                <div className="flex justify-end items-end">
                                <div className="relative">
                                <input
                                type='checkbox'
                                name='autoSaver'
                                className='sr-only'
                                checked={isUpdate}
                                onChange={()=>setIsUpdate(!isUpdate)}
                                />
                                <span
                                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                                    isUpdate ? 'bg-[#2ecc71]' : 'bg-[#e84118]'
                                }`}
                                >
                                <span
                                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                    isUpdate ? 'translate-x-6' : ''
                                    }`}
                                ></span>
                                </span>
                                </div>
                                </div>
                                
                            </label>
                            <label className='autoSaverSwitch relative inline-flex justify-between px-3 cursor-pointer select-none items-center mt-2'>
                                <span className='label flex items-center text-lg font-medium text-black ml-5'>
                                Share Access
                                </span>
                                <input
                                type='checkbox'
                                name='autoSaver'
                                className='sr-only'
                                checked={isShare}
                                onChange={()=>setIsShare(!isShare)}
                                />
                                <span
                                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                                    isShare ? 'bg-[#2ecc71]' : 'bg-[#e84118]'
                                }`}
                                >
                                <span
                                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                    isShare ? 'translate-x-6' : ''
                                    }`}
                                ></span>
                                </span>
                                
                            </label>
                            <label className='autoSaverSwitch relative inline-flex cursor-pointer mb-2 justify-between px-3 select-none items-center mt-2'>
                                <span className='label flex items-center text-lg font-medium text-black ml-5'>
                                Burn NFT
                                </span>
                                <input
                                type='checkbox'
                                name='autoSaver'
                                className='sr-only'
                                checked={isBurn}
                                onChange={()=>setIsBurn(!isBurn)}
                                />
                                <span
                                className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
                                    isBurn ? 'bg-[#2ecc71]' : 'bg-[#e84118]'
                                }`}
                                >
                                <span
                                    className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
                                    isBurn ? 'translate-x-6' : ''
                                    }`}
                                ></span>
                                </span>
                                
                            </label>
                        </div>
                    </div>
                </div>
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