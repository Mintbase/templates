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
import Image from "next/image";
import Link from "next/link";

interface SuccessPageData {
  nftTitle: string;
  mediaUrl: string;
  metaPage: string;
  txnHashUrl: string;
}

export function SuccessPage({ data }: { data: SuccessPageData }): JSX.Element {
  const { nftTitle, mediaUrl, metaPage, txnHashUrl } = data;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardDescription> Success you just Minted! </CardDescription>
        <CardTitle>{nftTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex w-full min-h-[200px]	relative">
          <Image src={mediaUrl} fill alt={nftTitle} />
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
  );
}
