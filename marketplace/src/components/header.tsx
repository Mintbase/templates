"use client";
import { useMbWallet } from "@mintbase-js/react";
import { MbButton } from "mintbase-ui";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isConnected, selector, connect, activeAccountId, disconnect } =
    useMbWallet();
  const router = useRouter();

  const buttonLabel = isConnected
    ? `Sign Out ${activeAccountId}`
    : " Connect NEAR Wallet";

  const buttonAction = isConnected ? disconnect : connect;

  return (
    <div className="flex justify-between items-center bg-white p-4 sticky top-0 border-b z-30">
      <Link href="/" className="flex gap-2 items-center">
        <div className="text-black font-bold">MARKET</div>
      </Link>
      <div>
        <MbButton onClick={buttonAction} label={buttonLabel} />
      </div>
    </div>
  );
};

export default Header;
