"use client";

import "@near-wallet-selector/modal-ui/styles.css";
import { Inter } from "next/font/google";
import "../styles.css";
import "./globals.css";

import { BitteWalletContextProvider } from "@mintbase-js/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "@/components/header";
import { mbjs } from "@mintbase-js/sdk";
import { SocialMedias } from "@/components/Social";

const inter = Inter({ subsets: ["latin"] });

export const isDev = process.env.NEXT_PUBLIC_ENV === "dev";

export const getCallbackUrl = () => {
  let callbackUrl = "";

  if (typeof window !== "undefined") {
    callbackUrl =
      isDev || window?.location?.host.includes("localhost")
        ? `http://${window?.location.host}`
        : `}`;
  }

  return callbackUrl;
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  mbjs.config({
    network: process.env.NEXT_PUBLIC_NETWORK || "testnet",
  });

  const BitteWalletSetup = {
    contractAddress: "hellovirtualworld.mintspace2.testnet",
    network: "testnet",
    callbackUrl: getCallbackUrl(),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BitteWalletContextProvider {...BitteWalletSetup} onlyBitteWallet>
        <html lang="en">
          <body className={inter.className}>
            <SocialMedias />
            <Header />
            <div className="min-h-screen">{children}</div>
          </body>
        </html>
      </BitteWalletContextProvider>
    </QueryClientProvider>
  );
}
