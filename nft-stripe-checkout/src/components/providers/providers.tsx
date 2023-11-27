"use client";

import { WalletProvider } from "@/components/providers/wallet-provider";

export function Providers({ children, ...props }: any) {
  return <WalletProvider>{children}</WalletProvider>;
}
