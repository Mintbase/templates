"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MintbaseWalletContextProvider } from "@mintbase-js/react";

const inter = Inter({ subsets: ["latin"] });


export const MintbaseWalletSetup = {
  contractAddress: "test122212.mintspace2.testnet",
  network: "testnet",
  callbackUrl: "http://testnet.localhost:3000/",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
      <html lang="en">
        <body className={`${inter.className} dark`}>
          <div className="flex flex-1 flex-col min-h-screen text-gray-500 gradient w-full  h-full flex justify-center items-center bold text-white">
          {children}
          </div>
          </body>
      </html>
    </MintbaseWalletContextProvider>
  );
}
