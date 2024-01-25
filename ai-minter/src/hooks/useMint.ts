"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMbWallet } from "@mintbase-js/react";

import { zodResolver } from "@hookform/resolvers/zod";

import { mint, execute } from "@mintbase-js/sdk";
import { uploadReference } from "@mintbase-js/storage"
import { formSchema } from "./formSchema";
import { MintbaseWalletSetup } from "@/config/setup";
import { Wallet } from "@near-wallet-selector/core";

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

  const onSubmit = async (data: { [x: string]: string }) => {
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
    wallet: Wallet
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
      await execute({ wallet }, mintCall);
    }
  }

  return { form, onSubmit, preview, setPreview };
};

export default useMintImage;
