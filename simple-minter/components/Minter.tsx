import { useWallet } from "@mintbase-js/react";
import MintForm from "./MintForm";
import { FormProvider, useForm } from "react-hook-form";
import { MbButton, MbText } from "mintbase-ui";
import { uploadReference } from "@mintbase-js/storage";
import { mint, execute } from "@mintbase-js/sdk";
import { DESCRIPTION, MAIN_IMAGE, TITLE } from "../constants";

export default function Minter() {
  const { selector, activeAccountId } = useWallet();

  const methods = useForm({
    defaultValues: {
      [TITLE]: "",
      [DESCRIPTION]: "",
      [MAIN_IMAGE]: null,
    },
  });
  const { getValues, handleSubmit } = methods;

  const onSubmit = async (data: { [x: string]: any }) => {
    const wallet = await selector.wallet();
    const file = getValues(MAIN_IMAGE);

    if (file == null || activeAccountId == null) {
      console.error("Error uploading file")
      return
    }

    const reference = await handleUpload(file, data);
    await handleMint(reference, activeAccountId, wallet);
  };

  return (
    <div className="md:max-w-2xl w-full space-y-4">
      <div className="flex flex-col items-center justify-center mt-2">
        <MbText className="text-3xl">Mint your NFTs</MbText>
        <div className="w-full mt-4 space-y-4">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit, (errorMsgs) =>
                console.error(errorMsgs)
              )}
            >
              <MintForm />
              <div className="flex justify-center items-center mt-4">
                <MbButton type="submit" label="Mint Me" />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}

async function handleUpload(file: File, data: { [x: string]: any }): Promise<string> {
  const metadata = {
    title: data[TITLE],
    description: data[DESCRIPTION],
    media: file
  };

  const referenceJson = await uploadReference(metadata)
  console.log("Successfully uploaded with referece:", referenceJson.id)
  return referenceJson.id
}

async function handleMint(reference: string, activeAccountId: string, wallet: any) {


  if (reference) {
    const mintCall = mint({
      noMedia: true,
      metadata: {
        reference: reference
      },
      ownerId: activeAccountId
    })

    await execute({ wallet }, mintCall)
  }
}
