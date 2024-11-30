"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useMintImage from "@/hooks/useMint";
import { getImageData } from "@/hooks/utils";
import Project from "@/components/Project/Project"
import Instruction from "./Instruction/Instruction";

export default function Minter() {
  const { preview, setPreview,onSubmit,setFileImg, setDescription, setTitle } = useMintImage();
  return (
    <div className="flex flex-wrap justify-center gap-8 mt-5 px-5 mb-[20]">
      
      <Card className="relative p-2 bg-black bg-opacity-10 hover:bg-opacity-10 transition-all duration-300 rounded-xl md:w-[400px] max-sm:w-full shadow-xl cursor-pointer">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl font-bold">Mint your NFT</CardTitle>
          </CardHeader>
          <CardContent>
          <input placeholder="Title" type="text" onChange={(e)=>setTitle(e.target.value)} className="w-full px-3 py-2 rounded-md bg-black bg-opacity-10 hover:bg-opacity-20 border border-white placeholder:text-white outline-none focus:outline-none focus:border-white"/>
            <div className="h-2"></div>
            <textarea placeholder="Description" onChange={(e)=>setDescription(e.target.value)} className="w-full px-3 py-2 rounded-md bg-black bg-opacity-10 hover:bg-opacity-20  outline-none border border-white placeholder:text-white"/>
            <div className="h-2"></div>
            {preview && (
              <img
                src={preview as string}
                alt="Selected Preview"
                style={{
                  maxWidth: "330px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  maxHeight:"330px"
                }}
              />
            )}
            {!preview&&            <label
              className="flex  cursor-pointer appearance-none justify-center rounded-md border border-dashed border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75">
              <span className="flex items-center space-x-2">
                <svg className="h-6 w-6 stroke-gray-400" viewBox="0 0 256 256">
                  <path
                    d="M96,208H72A56,56,0,0,1,72,96a57.5,57.5,0,0,1,13.9,1.7"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="24"></path>
                  <path
                    d="M80,128a80,80,0,1,1,144,48"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="24"></path>
                  <polyline
                    points="118.1 161.9 152 128 185.9 161.9"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="24"></polyline>
                  <line
                    x1="152"
                    y1="208"
                    x2="152"
                    y2="128"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="24"></line>
                </svg>
                <span className="text-xs font-medium text-gray-600">
                  Drop files to Attach, or &nbsp;
                  <span className="text-blue-600 underline">browse</span>
                </span>
              </span>
              <input id="photo-dropbox" type="file" className="sr-only" onChange={(event) => {
                const { files, displayUrl } = getImageData(event);
                setPreview(displayUrl);
                setFileImg(files[0])
              }}/>
            </label>}
          </CardContent>
          <CardFooter className="justify-center items-center">
            <Button onClick={()=>onSubmit()} type="submit">Mint Me </Button>
          </CardFooter>
      </Card>
      <Project/>
      <Instruction/>
    </div>
  );
}