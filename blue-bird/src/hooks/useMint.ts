/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { SubmitHandler } from 'react-hook-form';
import * as z from "zod";
import { useMbWallet } from "@mintbase-js/react";

import { zodResolver } from "@hookform/resolvers/zod";

import {

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
  media: File | null;
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

  const onSubmit: SubmitHandler<{
    title: string;
    description: string;
    media: ((false | File) & (false | File | undefined)) | null;
  }> = async (data) => {
    const wallet = await getWallet();

    if(data.media !== null && data.media !== false){
    const reference = await uploadReference({
      title: data.title,
      media: data.media,
    });

    
    await handleMint(
      reference.id,
      data.media,
      activeAccountId as string,
      wallet,
      reference.media_url as string,
      data.title
    );
  } else {
    // Handle the case when media is undefined
    console.error("Media is null");
    // Optionally, you can display an error message or perfor
  }
  }
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function handleMint(
    reference: string,
    media: File | null ,
    activeAccountId: string,
    wallet: Wallet,
    mediaUrl: string,
    nftTitle: string
  ) {
    if (media !== null) {
    const callbackArgs = {
      contractAddress: MintbaseWalletSetup.contractAddress.toString(),
      amount: 1,
      ref: `${reference}`,
      mediaUrl: mediaUrl,
      title: nftTitle,
    };

    let metadata: { [key: string]: string } = {
        reference,
        media: '', // Default value
      };
    
      if (media !== null) {
        // Convert File to Blob
         const blob = new Blob([media], { type: media.type });
        // Create a new File object from the Blob
        const convertedFile = new File([blob], media.name, { type: media.type })

        // If media is a Blob object, do something with it (e.g., upload)
         const uploadedMedia = await uploadFile(convertedFile);
        metadata.media = uploadedMedia.id;
      }

      

    
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
                metadata: JSON.stringify(metadata),
                nft_contract_id: MintbaseWalletSetup.contractAddress,
              },
              gas: "200000000000000",
              deposit: "10000000000000000000000",
            },
          },
        ],
      });
    } else {
        console.error("Media is null");
        // Handle the case when media is null
    }
  }

  return { form, onSubmit, preview, setPreview };
};

export default useMintImage;
