"use client";
import { useMbWallet } from "@mintbase-js/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();
  const router = useRouter();

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    router.push("/");
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };

  return (
    <div className="flex justify-between items-center bg-white p-4 sticky top-0 border-b z-30">
      <Link href="/" className="flex gap-2 items-center">
        <div className="text-black font-bold">MARKET</div>
      </Link>
      <div>
        {isConnected ? (
          <div className="flex gap-4 items-center">
            <div className="hidden sm:block">{activeAccountId}</div>
            <button
              className="bg-black text-white rounded p-3"
              onClick={handleSignout}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            className="bg-black text-white rounded p-3"
            onClick={handleSignIn}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
