import { AppProviders } from "@/components/app-providers";
import Footer from "@/components/footer";
import Header from "@/components/header";
import "@near-wallet-selector/modal-ui/styles.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Blogchain`,
  description: "The decentralized writer's blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProviders>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </AppProviders>
  );
}
