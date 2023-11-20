"use client";

import { useMbWallet } from "@mintbase-js/react";
import MintForm from "./MintForm";
import { FormProvider, useForm } from "react-hook-form";
import { uploadReference } from "@mintbase-js/storage";
import { mint, execute } from "@mintbase-js/sdk";
import { DESCRIPTION, MAIN_IMAGE, TITLE } from "@/constants";
import useMintImage from "@/data/useMint";
import { Button } from "./ui/button";

export default function Minter() {
  const { selector, activeAccountId } = useMbWallet();

  const methods = useForm({
    defaultValues: {
      [TITLE]: "",
      [DESCRIPTION]: "",
      [MAIN_IMAGE]: null,
    },
  });
  const { getValues, handleSubmit } = methods;
  const file = getValues(MAIN_IMAGE);
  const { mintImage } = useMintImage();

  const onSubmit = async (data: { [x: string]: any }) => {
    const wallet = await selector.wallet();

    if (file == null || activeAccountId == null) {
      console.error("Error uploading file");
      return;
    }

    const res = await mintImage(file);

    console.log(res, "res");

    return res;
  };

  return (
    <div className="md:max-w-2xl w-full space-y-4">
      <div className="flex flex-col items-center justify-center mt-2">
        <h1 className="text-3xl">Mint your NFT</h1>
        <div className="w-full mt-4 space-y-4">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit, (errorMsgs) =>
                console.error(errorMsgs)
              )}
            >
              <MintForm />
              <div className="flex justify-center items-center mt-4">
                <Button type="submit"  >Mint Me </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

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
  console.log("Successfully uploaded with referece:", referenceJson.id);
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
      contractAddress: process.env.CONTRACT_ADDRESS,
      ownerId: activeAccountId,
    });

    await execute({ wallet }, mintCall);
  }
}
