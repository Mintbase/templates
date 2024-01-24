"use client"

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useMbWallet } from "@mintbase-js/react";

import { zodResolver } from "@hookform/resolvers/zod";

import { uploadFile } from "@mintbase-js/storage"
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

  const getImageAsFile = async (url: string): Promise<File> => {
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
      throw new Error("Failed to convert image to File");
    }
  };

  const onSubmit = async (data: { [x: string]: any }) => {
    const wallet = await getWallet();
    const media = await getImageAsFile(data?.media);
    const file = await uploadFile(media)

    await handleMint(file.id, activeAccountId as string, wallet);
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
                metadata: JSON.stringify({ media: reference }),
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
