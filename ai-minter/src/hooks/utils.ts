"use client";

import { nearblocksApi } from "@/config/setup";
import { ChangeEvent } from "react";

export enum TransactionSuccessEnum {
  MINT = "mint",
}

interface CallbackArgs {
  contractAddress: string;
  amount: number;
  ref: string;
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
  args: CallbackArgs
) =>
  `${window.location.origin}/?signMeta=${encodeURIComponent(
    JSON.stringify({
      type: transactionType,
      args: args,
    })
  )}`;

export const cbUrl = (hash: string, callbackArgs: CallbackArgs) =>
  callbackUrl(hash, TransactionSuccessEnum.MINT, callbackArgs);

export const getTxnHash = async (hash: string) => {
  const res = await fetch(`${nearblocksApi}/v1/search/?keyword=${hash}`);

  const txn = await res.json();

  return txn?.receipts[0].originated_from_transaction_hash;
};
