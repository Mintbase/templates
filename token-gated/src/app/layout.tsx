"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "../styles.css";

import { MintbaseWalletContextProvider } from "@mintbase-js/react";

const inter = Inter({ subsets: ["latin"] });

const MintbaseWalletSetup = {
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
  network: process.env.NEXT_PUBLIC_NETWORK,
  callbackUrl: process.env.NEXT_PUBLIC_CALLBACK_URL,
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
