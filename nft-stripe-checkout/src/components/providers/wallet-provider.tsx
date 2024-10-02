"use client";

import "@near-wallet-selector/modal-ui/styles.css";
import { BitteWalletContextProvider } from "@mintbase-js/react";
import { constants } from "@/lib/constants";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <BitteWalletContextProvider
      contractAddress={constants.network === "testnet" ? "testnet" : "near"}
      network={constants.network as "testnet" | "mainnet"}
      callbackUrl={constants.callbackUrl}
      onlyBitteWallet
    >
      {children}
    </BitteWalletContextProvider>
  );
}
