"use client";

import "@near-wallet-selector/modal-ui/styles.css";
import { MintbaseWalletContextProvider } from "@mintbase-js/react";

export function WalletProvider({ children }: { children: React.ReactNode }) {
    return (
      <MintbaseWalletContextProvider
        contractAddress={"testnet"}
        network={"testnet"}
        callbackUrl={"http://localhost:3000/"}
      >
        {children}
      </MintbaseWalletContextProvider>
    );
  }
  