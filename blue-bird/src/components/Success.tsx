import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

interface SuccessPageData {
  nftTitle: string;
  mediaUrl: string;
  metaPage: string;
  txnHashUrl: string;
}

export function SuccessPage({ data }: { data: SuccessPageData }): JSX.Element {
  const { nftTitle, mediaUrl, metaPage, txnHashUrl } = data;

  return (
    <>
    <Link  href="/">
        <Button> Home </Button>
    </Link>
    <Card className="w-[350px]">
      <CardHeader>
        <CardDescription> Success you just Minted! </CardDescription>
        <CardTitle>{nftTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full relative">
          <Image src={mediaUrl} width={200} height={200} alt={nftTitle} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link target="_blank" href={txnHashUrl} className="text-xs">
          View Transaction
        </Link>
        <Link target="_blank" href={metaPage}>
          <Button> View Nft on Mintbase</Button>
        </Link>
      </CardFooter>
    </Card>
    </>
    
  );
}
