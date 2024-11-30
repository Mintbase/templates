
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function Instruction(){
    return(
        <Card className="relative p-2  bg-black bg-opacity-30 transition-all duration-300 rounded-xl shadow-xl ">
          <CardHeader>
            <CardTitle className="text-white text-center text-2xl font-bold">Instruction</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col text-left text-lg text-wrap mt-3 break-words">
            <p className="text-wrap break-words">Project Description: Fractionalize an NFT and grant </p>
            <p>access/ownership to different sub-accounts </p>
            <p>without transferring the actual NFT.</p>
            <p className="mt-3 text-xl font-bold">NFT Owner:</p>
            <p>1. Mint the NFT.</p>
            <p>2. Share access with specific addresses.</p>
            <p className="mt-5 text-xl font-bold">Access NFT:</p>
            <p>3. Update the NFT metadata.</p>
            <p>4. Send the NFT to another address.</p>
          </CardContent>
        </Card>
    )
}