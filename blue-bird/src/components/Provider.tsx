"use client"

import { Inter } from "next/font/google";
import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import "@near-wallet-selector/modal-ui/styles.css";
import { MintbaseWalletSetup } from "@/config/setup";


const inter = Inter({ subsets: ["latin"] });


export const AppProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  return(
    <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
    <html lang="en">
      <body className={`${inter.className} dark`}>
        <div className="flex flex-1 flex-col min-h-screen text-gray-500 gradient w-full  h-full flex justify-center items-center bold text-white">
          {children}
        </div>
      </body>
    </html>
  </MintbaseWalletContextProvider>
  )
}