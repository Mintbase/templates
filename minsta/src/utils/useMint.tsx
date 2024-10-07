import { useMbWallet } from "@mintbase-js/react";
import { uploadReference } from "@mintbase-js/storage";
import { useState } from "react";
import { convertBase64ToFile } from "./base64ToFile";
import { generateRandomId } from "./generateRandomId";
import { useReplicate } from "@/providers/replicate";
import { constants } from "@/constants";

interface ReferenceObject {
  title: string;
  description: string;
  media: File;
}

const useMintImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { selector, activeAccountId } = useMbWallet();
  const { addRequest } = useReplicate();

  const getWallet = async () => {
    try {
      return await selector.wallet();
    } catch (error) {
      console.error("Failed to retrieve the wallet:", error);
      setLoading(false);
      throw new Error("Failed to retrieve the wallet");
    }
  };

  const getTitleAndDescription = async (photo: string) => {
    try {
      const requestPayload = {
        image: photo,
        prompt: `Describe this image, be direct and include important details. The title should be succinct and 5 words long. The description can be longer than 15 words and more descriptive.
      
      Respond in JSON {"title": "<title>", "description": "<description>"}`,
      };
      const requestHash =
        "2facb4a474a0462c15041b78b1ad70952ea46b5ec6ad29583c0b29dbd4249591";
      const response = await addRequest(requestPayload, requestHash);

      return JSON.parse(response.output.join(""));
    } catch (error) {
      console.error("Failed to get title and description:", error);
      return {
        title: generateRandomId(10),
        description: generateRandomId(10),
      };
    }
  };

  const uploadReferenceObject = async (refObject: ReferenceObject) => {
    try {
      return await uploadReference(refObject);
    } catch (error) {
      console.error("Failed to upload reference:", error);
      setLoading(false);
      throw new Error("Failed to upload reference");
    }
  };

  const performTransaction = async (
    wallet: any,
    metadata: any,
  ) => {
    if (!wallet) {
      throw new Error("Wallet is not defined.");
    }

    try {
      return await wallet.signAndSendTransaction({
        signerId: activeAccountId,
        receiverId: constants.proxyContractAddress,
        actions: [
          {
            type: "FunctionCall",
            params: {
              methodName: "mint",
              args: {
                metadata: JSON.stringify(metadata),
                nft_contract_id: constants.tokenContractAddress,
              },
              gas: "200000000000000",
              deposit: "10000000000000000000000",
            },
          },
        ],
      });
    } catch (error) {
      console.error("Failed to sign and send transaction:", error);
      throw new Error("Failed to sign and send transaction");
    }
  };

  const reduceImageSize = (
    base64: string,
    maxSizeMB: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Create an off-screen image element to load the base64 image
      const img = new Image();
      img.src = base64;

      // Define the onload handler
      img.onload = () => {
        // Get original dimensions
        const width = img.width;
        const height = img.height;

        // Calculate the size of the base64 string in bytes
        const sizeInBytes =
          base64.length * (3 / 4) -
          (base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0);
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        // If the image size is under the limit, resolve with the original base64
        if (sizeInBytes <= maxSizeBytes) {
          resolve(base64);
          return;
        }

        // Calculate the scaling factor
        const scalingFactor = Math.sqrt(maxSizeBytes / sizeInBytes);
        const newWidth = Math.floor(width * scalingFactor);
        const newHeight = Math.floor(height * scalingFactor);

        // Create a canvas with the new dimensions
        const canvas = document.createElement("canvas");
        canvas.width = newWidth;
        canvas.height = newHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Unable to get canvas context"));
          return;
        }

        // Draw the scaled image on the canvas
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        // Convert the canvas to a base64 string
        const resizedBase64 = canvas.toDataURL();

        // Resolve with the resized base64 string
        resolve(resizedBase64);
      };

      // Define the onerror handler
      img.onerror = (error) => {
        reject(error);
      };
    });
  };

  const mintImage = async (photo: string) => {
    if (!activeAccountId) {
      setError("Active account ID is not set.");
      return;
    }

    setLoading(true);

    try {
      const wallet = await getWallet();
      const photoFile = convertBase64ToFile(photo);
      const replicatePhoto = await reduceImageSize(photo, 10); //10MB limit replicate
      const titleAndDescription = await getTitleAndDescription(replicatePhoto);
      const refObject = {
        title: titleAndDescription.title,
        description: titleAndDescription.description,
        media: photoFile,
      };
      const uploadedData = await uploadReferenceObject(refObject);
      const metadata = { reference: uploadedData?.id };
      await performTransaction(wallet, metadata);
    } catch (error: any) {
      setError(
        error?.message || "An error occurred during the minting process."
      );
    } finally {
      setLoading(false);
    }
  };

  return { mintImage, loading, error };
};

export default useMintImage;
