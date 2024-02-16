"use client";

import { ChangeEvent } from "react";



export enum TransactionSuccessEnum {
  MINT = 'mint',
}

export function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
}


export const callbackUrl = (
  hash: string,
  transactionType: TransactionSuccessEnum,
  args: Record<string, string | number | boolean>
) =>
  `${
    window.location.origin
  }/wallet-callback?transactionHashes=${hash}&signMeta=${encodeURIComponent(
    JSON.stringify({
      type: transactionType,
      args: args,
    })
  )}`


const callbackArgs = {
  contractAddress: finalAddress.toString(),
  amount: Number(mintAmount),
  ref: `${id}`,
}

export const cbUrl = (hash: string) =>
  callbackUrl(hash, TransactionSuccessEnum.MINT, callbackArgs)