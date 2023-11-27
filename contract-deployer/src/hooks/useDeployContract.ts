"use client";

import { useMbWallet } from "@mintbase-js/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

import { checkStoreName } from "@mintbase-js/data";
import { MINTBASE_CONTRACTS, deployContract, execute } from "@mintbase-js/sdk";
import { formSchema } from "./formSchema";

const useDeployContract = () => {
  const [alreadyExistsError, setAlreadyExistsError] = useState<string>("");
  const { selector, activeAccountId } = useMbWallet();

  const getWallet = async () => {
    try {
      return await selector.wallet();
    } catch (error) {
      console.error("Failed to retrieve the wallet:", error);
      throw new Error("Failed to retrieve the wallet");
    }
  };

  const onSubmit = async (data: FieldValues) => {
    await handleDeployContract(data);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleDeployContract = async (data: FieldValues): Promise<void> => {
    if (!activeAccountId) return;

    // check if contract already exists.
    const { data: checkStore } = await checkStoreName(data.name);

    if (checkStore?.nft_contracts.length === 0) {
      setAlreadyExistsError("");
      const wallet = await getWallet();
      const deployArgs = deployContract({
        name: data.name,
        ownerId: activeAccountId,
        factoryContractId: MINTBASE_CONTRACTS.testnet,
        metadata: {
          symbol: data.symbol,
        },
      });

      await execute({ wallet }, deployArgs);
    } else {
      setAlreadyExistsError("Contract already exists.");
    }
  };

  return { form, onSubmit, alreadyExistsError, setAlreadyExistsError };
};

export default useDeployContract;
