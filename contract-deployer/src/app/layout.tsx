import { AppComponent } from "@/components/App";
import "./globals.css";

import { SocialMedias } from "@/components/Social";
import "@near-wallet-selector/modal-ui/styles.css";
import { Metadata } from "next";

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
    <AppComponent>
      <SocialMedias /> {children}
    </AppComponent>
  );
}
