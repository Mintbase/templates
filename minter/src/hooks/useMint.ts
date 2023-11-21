"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMbWallet } from "@mintbase-js/react";

import { TITLE, DESCRIPTION } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { mint, execute } from "@mintbase-js/sdk";
import { formSchema } from "./formSchema";
import { MintbaseWalletSetup } from "@/config/setup";
import { uploadReference } from "@mintbase-js/storage";

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

  const onSubmit = async (data: { [x: string]: any }) => {
    const wallet = await getWallet();
    const uploadRef = await handleUpload(data.media, data);
    await handleMint(uploadRef, activeAccountId as string, wallet);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  async function handleUpload(
    file: File,
    data: { [x: string]: any }
  ): Promise<string> {
    const metadata = {
      title: data[TITLE],
      description: data[DESCRIPTION],
      media: file,
    };

    const referenceJson = await uploadReference(metadata);
    console.log("Successfully uploaded with reference:", referenceJson.id);
    return referenceJson.id;
  }

  async function handleMint(
    reference: string,
    activeAccountId: string,
    wallet: any
  ) {
    if (reference) {
      const mintCall = mint({
        noMedia: true,
        metadata: {
          reference: reference,
        },
        contractAddress: MintbaseWalletSetup.contractAddress,
        ownerId: activeAccountId,
      });

      await execute({ wallet }, mintCall);
    }
  }

  return { form, onSubmit, preview, setPreview };
};

export default useMintImage;
