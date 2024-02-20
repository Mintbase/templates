"use client";

import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <MintbaseWalletContextProvider
      contractAddress="hellovirtualworld.mintspace2.testnet"
      network="testnet"
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MintbaseWalletContextProvider>
  );
}
