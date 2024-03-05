import type { Metadata } from "next";
import "./globals.css";
import { SocialMedias } from "@/components/social";

export const metadata: Metadata = {
  title: "Fiat NFT checkout | Mintbase Templates",
  description: "Template for buying a NFT with Credit Card using Stripe",
  openGraph: {
    title: `Fiat NFT checkout | Mintbase Templates`,
    description: "Template for buying a NFT with Credit Card using Stripe",
    images: [
      {
        type: "image/png",
        url: "https://i.imgur.com/9byWkpK.png",
        width: "1200",
        height: "630",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Fiat NFT checkout | Mintbase Templates`,
    description:  "Template for buying a NFT with Credit Card using Stripe",
    creator: "Mintbase",
    images: "https://i.imgur.com/9byWkpK.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SocialMedias />
        {children}</body>
    </html>
  );
}
