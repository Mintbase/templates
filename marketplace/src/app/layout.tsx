"use client";

import "@near-wallet-selector/modal-ui/styles.css";
import { Inter } from "next/font/google";
import "../styles.css";
import "./globals.css";

import Header from "@/components/Header";
import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

const MintbaseWalletSetup = {
  contractAddress: "hellovirtualworld.mintspace2.testnet",
  network: "testnet" as any,
  callbackUrl: "http://localhost:3000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            <div className="min-h-screen">{children}</div>
          </body>
        </html>
      </MintbaseWalletContextProvider>
    </QueryClientProvider>
  );
}
