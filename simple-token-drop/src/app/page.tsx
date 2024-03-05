import type { Metadata } from "next";
import Minter from "./Minter";



export const metadata: Metadata = {
  title: "Token Airdrop | Mintbase Templates",
  description: "Template for Token Drops",
  openGraph: {
    title: `Token Airdrop | Mintbase Templates`,
    description: "Template for Token Drops",
    images: [
      {
        type: "image/png",
        url: "https://i.imgur.com/U5x0IdF.png",
        width: "1200",
        height: "630",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Token Airdrop | Mintbase Templates`,
    description:  "Template for Token Drops",
    creator: "Mintbase",
    images: "https://i.imgur.com/U5x0IdF.png",
  },
};

export default function Home() {

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center space-y-8 px-4 md:px-0">
        <Minter />
      </div>
    </>
  );
}


