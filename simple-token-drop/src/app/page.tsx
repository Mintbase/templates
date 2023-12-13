import type { Metadata } from "next";
import Minter from "./Minter";

export const metadata: Metadata = {
  title: "Mintbase Simple Airdrop Example",
  description: "Simple Airdrop with Next.js 14",
};

export default function Home() {

  return (
    <>
      <div className="w-full flex flex-col justify-center items-center space-y-8">
        <Minter />
      </div>
    </>
  );
}


