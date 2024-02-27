/**
 * @file useMint.ts
 * @title Minting Hook for Images
 * @description Provides a React hook `useMintImage` for handling the minting process of images on the Mintbase platform.
 * This includes form handling, file uploading, and interacting with the Mintbase blockchain to mint the image as an NFT.
 * It utilizes the `@mintbase-js/react` and `@mintbase-js/storage` packages for wallet integration and file storage, respectively.
 * The hook returns an object containing the form handlers and a preview state for the image to be minted.
 */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMbWallet } from "@mintbase-js/react";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  ArweaveResponse,
  uploadFile,
  uploadReference,
} from "@mintbase-js/storage";
import { formSchema } from "./formSchema";
import { MintbaseWalletSetup, proxyAddress } from "@/config/setup";
import { Wallet } from "@near-wallet-selector/core";
import { cbUrl } from "./utils";

interface SubmitData {
  title: string;
  description: string;
  media: ((false | File) & (false | File | undefined)) | null;
}

const useMintImage = () => {
  const { selector, activeAccountId } = useMbWallet();
  const [preview, setPreview] = useState<string | File>("");

  const getWallet = async () => {
    try {
      return await selector.wallet();
    } catch (error) {
      console.error("Failed to retrieve the wallet:", error);
      throw new Error("Failed to retrieve the wallet");
    }
  };

  const onSubmit = async (data: SubmitData) => {
    const wallet = await getWallet();

    const reference = await uploadReference({
      title: typeof data?.title === "string" ? data.title : "",
      media: data?.media as unknown as File,
    });

    const file = uploadFile(data?.media as unknown as File);

    await handleMint(
      reference.id,
      file,
      activeAccountId as string,
      wallet,
      reference.media_url as string,
      data.title
    );
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleMint(
    reference: string,
    media: Promise<ArweaveResponse>,
    activeAccountId: string,
    wallet: Wallet,
    mediaUrl: string,
    nftTitle: string
  ) {
    const callbackArgs = {
      contractAddress: MintbaseWalletSetup.contractAddress.toString(),
      amount: 1,
      ref: `${reference}`,
      mediaUrl: mediaUrl,
      title: nftTitle,
    };

    if (reference) {
      await wallet.signAndSendTransaction({
        signerId: activeAccountId,
        receiverId: proxyAddress,
        callbackUrl: cbUrl(reference, callbackArgs),
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "mint",
              args: {
                metadata: JSON.stringify({
                  reference,
                  media: (await media).id,
                }),
                nft_contract_id: MintbaseWalletSetup.contractAddress,
              },
              gas: "200000000000000",
              deposit: "10000000000000000000000",
            },
          },
        ],
      });
    }
  }

  return { form, onSubmit, preview, setPreview };
};

export default useMintImage;
