"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMbWallet } from "@mintbase-js/react";

import { TITLE, DESCRIPTION } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { mint, execute } from "@mintbase-js/sdk";
import { uploadReference } from "@mintbase-js/storage"
import { formSchema } from "./formSchema";
import { MintbaseWalletSetup } from "@/config/setup";

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

  const getImageAsBlob = async (url: string): Promise<Blob | null> => {
    try {
      // Fetch the image
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch image. Status code: ${response.status}`);
      }

      // Convert the image to a Blob
      const imageBlob = await response.blob();

      // Create a File object from the Blob
      const imageFile = new File([imageBlob], 'image', { type: imageBlob.type });

      return imageFile;
    } catch (error: any) {
      console.error(`Error: ${error?.message}`);
      return null;
    }
  };

  const onSubmit = async (data: { [x: string]: any }) => {
    const wallet = await getWallet();
    const reference = await uploadReference({ 
      title: data?.title, 
      media: data?.media 
    })

    await handleMint(reference.id, activeAccountId as string, wallet);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function handleMint(
    reference: string,
    activeAccountId: string,
    wallet: any
  ) {
    if (reference) {
      const mintCall = mint({
        noMedia: true,
        metadata: {
          reference: reference
        },
        contractAddress: MintbaseWalletSetup.contractAddress,
        ownerId: activeAccountId,
      });
      const res = await execute({ wallet }, mintCall);
    }
  }

  return { form, onSubmit, preview, setPreview };
};

export default useMintImage;
