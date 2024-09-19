"use client";

import "@near-wallet-selector/modal-ui/styles.css";
import { BitteWalletContextProvider } from "@mintbase-js/react";

export function WalletProvider({ children }: { children: React.ReactNode }) {
    return (
      <BitteWalletContextProvider
        contractAddress={"testnet"}
        network={"testnet"}
        callbackUrl={"http://localhost:3000/"}
        onlyBitteWallet
      >
        {children}
      </BitteWalletContextProvider>
    );
  }
