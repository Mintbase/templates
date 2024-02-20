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
  description: "The decentralized writers blog",
  openGraph: {
    title: `Blogchain`,
    description: "Your forever thoughts on the Blockchain",
    images: [
      {
        type: "image/png",
        url: "./thumbnail.png",
        width: "1200",
        height: "630",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blogchain`,
    description: "Your forever thoughts on the Blockchain",
    creator: "Mintbase",
    images: "./thumbnail.png",
  },
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
