"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "../styles.css";

import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import Header from "@/components/header";
import Head from "next/head";

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
      <Head>
        <title>Mintbase - Simple Marketplace Example</title>
      </Head>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="min-h-screen">{children}</div>
        </body>
      </html>
    </MintbaseWalletContextProvider>
  );
}
