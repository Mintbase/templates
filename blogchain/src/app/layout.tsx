"use client";

import Header from "@/components/header";
import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import "@near-wallet-selector/modal-ui/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { DarkModeProvider } from "@/context/DarkModeContext";
const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MintbaseWalletContextProvider
      contractAddress="hellovirtualworld.mintspace2.testnet"
      network="testnet"
    >
      <QueryClientProvider client={queryClient}>
        <html lang="en">
          <body className={inter.className}>
            <DarkModeProvider>
              <Header />
              {children}
              <Footer />
            </DarkModeProvider>
          </body>
        </html>
      </QueryClientProvider>
    </MintbaseWalletContextProvider>
  );
}
