"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import { MintbaseWalletSetup } from "@/config/setup";
import "@near-wallet-selector/modal-ui/styles.css";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: `Near Contract Deployer`,
  description: "Deploy your own Near Contract in only 1 step",
  openGraph: {
    title: `Near Contract Deployer`,
    description: "Deploy your own Near Contract in only 1 step",
    images: [
      {
        type: "image/png",
        url: "https://i.imgur.com/CkxzRfq.png",
        width: "1200",
        height: "630",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Near Contract Deployer`,
    description: "Deploy your own Near Contract in only 1 step",
    creator: "Mintbase",
    images: "https://i.imgur.com/CkxzRfq.png",
  },
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
