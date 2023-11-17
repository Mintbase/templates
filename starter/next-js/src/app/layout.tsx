"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "../styles.css";


import { MintbaseWalletContextProvider } from "@mintbase-js/react";

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
  return (
    <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-1 flex-col min-h-screen text-gray-500 gradient w-full  h-full flex justify-center items-center bold text-white">
          {children}
          </div>
        </body>
      </html>
    </MintbaseWalletContextProvider>
  );
}
