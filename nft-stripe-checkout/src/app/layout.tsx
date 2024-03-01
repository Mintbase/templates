import type { Metadata } from "next";
import "./globals.css";
import { SocialMedias } from "@/components/social";

export const metadata: Metadata = {
  title: "Fiat NFT checkout | Mintbase Template",
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
