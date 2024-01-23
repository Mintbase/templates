import type { Metadata } from "next";
import Minter from "./Minter";

export const metadata: Metadata = {
  title: "Mintbase Airdrop",
  description: "Claim a free nft",
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


