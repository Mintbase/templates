"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMbWallet } from "@mintbase-js/react";

import { zodResolver } from "@hookform/resolvers/zod";

import { uploadReference } from "@mintbase-js/storage"
import { formSchema } from "./formSchema";
import { MintbaseWalletSetup, proxyAddress } from "@/config/setup";

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
      await wallet.signAndSendTransaction({
        signerId: activeAccountId,
        receiverId: proxyAddress,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "mint",
              args: {
                metadata: JSON.stringify({ reference: reference}),
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
