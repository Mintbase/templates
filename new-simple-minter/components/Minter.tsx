import { useWallet } from "@mintbase-js/react";
import MintForm from "../components/MintForm";
import { FormProvider, useForm } from "react-hook-form";
import { MbButton, MbText } from "mintbase-ui";
import { uploadFile } from "@mintbase-js/storage";
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
    const file = getValues(MAIN_IMAGE);
    const wallet = await selector.wallet();
    const referenceJson = await uploadReferenceData(file, data);
    if (activeAccountId != undefined && referenceJson != undefined) {
      await handleMinting(referenceJson, activeAccountId, wallet);
    }
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

function getFileFromObject(metadata: {
  title: string;
  description: string;
  media: string;
}): File {
  const str = JSON.stringify(metadata);
  return new File([str], "file", {
    type: "application/json;charset=utf-8",
  });
}

async function uploadReferenceData(
  file: any,
  data: { [x: string]: any }
): Promise<string | undefined> {
  try {
    if (file != null) {
      //uploads image to permanent storage
      const reference = await uploadFile(file);
      console.log("Successfully uploaded image with ref:", reference.id);

      // makes a json file containing metadata incluiding permanently hosted file
      // and uploads once more to permanent storage
      // this will be the final reference metadata

      const metadata = {
        title: data[TITLE],
        description: data[DESCRIPTION],
        media: `http://arweave.com/${reference.id}`,
      };

      const jsonFile = getFileFromObject(metadata);
      const referenceJson = await uploadFile(jsonFile);
      return referenceJson.id;
    }
  } catch (error) {
    console.error(error);
  }
}

async function handleMinting(
  referenceJson: string,
  activeAccountId: string,
  wallet: any
) {
  const mintCall = mint({
    nftContractId: "webtest.mintbase1.near",
    reference: referenceJson,
    ownerId: activeAccountId,
  });
  await execute({ wallet }, mintCall);
}
