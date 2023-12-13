"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import "@near-wallet-selector/modal-ui/styles.css";
import "../styles.css";



const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-1 flex-col min-h-screen text-gray-500 gradient w-full  h-full flex justify-center items-center bold text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
