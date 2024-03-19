"use client";

import { nearblocksApi } from "@/config/setup";
import { CallBackArgs } from "@mintbase-js/sdk";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTxnHash = async (hash: string) => {
  const res = await fetch(`${nearblocksApi}/v1/search/?keyword=${hash}`);

  const txn = await res.json();

  return txn?.receipts[0]?.originated_from_transaction_hash;
};

export const callbackUrl = (cbArgs: CallBackArgs) =>
  `${window.location.origin}/?signMeta=${encodeURIComponent(
    JSON.stringify({
      type: cbArgs.type,
      args: cbArgs.args,
    })
  )}`;
