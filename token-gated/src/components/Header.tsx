"use-client";
import Image from "next/image";
import Link from "next/link";
import { NearWalletConnector } from "./NearWalletSelector";

export const Header = () => {
  return (
    <nav className="bg-transparent flex items-center justify-around p-2">
      <Link href="/">
        <Image src="/vercel.svg" alt="vercel" width={152} height={102} />
      </Link>
      <NearWalletConnector isHeader />
    </nav>
  );
};
