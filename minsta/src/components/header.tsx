"use client";
import { useApp } from "@/providers/app";
import { useMbWallet } from "@mintbase-js/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactEventHandler } from "react";
import InlineSVG from "react-inlinesvg";
import Image from 'next/image'

const Header = () => {
  const pathname = usePathname();
  const { isConnected, selector, connect, activeAccountId } = useMbWallet();
  const { push } = useRouter();
  const { openModal } = useApp();

  const handleSignout = async () => {
    const wallet = await selector.wallet();
    return wallet.signOut();
  };

  const handleSignIn = async () => {
    return connect();
  };

  const headerButtonsNotHome = (onClick: ReactEventHandler) => (
    <div className="flex w-full justify-between px-4 lg:px-12 items-center">
      <div className="flex-1">
        <button className="font-bold text-xl" onClick={() => push("/")}>
          EthBerlin04 - Hackaton Center
        </button>
      </div>
      <div className="flex-1 flex justify-center">
        <Image src="/images/pokeball.png" width={50} height={50} alt="pokeball" />
      </div>
      <div className="flex-1 flex justify-end gap-4 text-white">
        {isConnected ? (
          <button onClick={handleSignout}> Logout</button>
        ) : (
          <button onClick={handleSignIn}> Login</button>
        )}
        <button onClick={() => push("/leaderboard")}>Leaderboard</button>
      </div>
    </div>
  );

  const renderHeaderButtons = () => {
    switch (pathname) {
      case "/":
        return (
          <div className="flex w-full justify-between px-4 lg:px-12 items-center">
            <div className="flex-1">
              <button className="font-bold text-xl" onClick={() => push("/")}>
                EthBerlin04 - Hackaton Center
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <Image src="/images/pokeball.png" width={50} height={50} alt="pokeball" />
            </div>
            <div className="flex-1 flex justify-end gap-4 text-white">
              {isConnected ? (
                <button onClick={handleSignout}> Logout</button>
              ) : (
                <button onClick={handleSignIn}> Login</button>
              )}
              <button onClick={() => push("/leaderboard")}>Leaderboard</button>
            </div>
          </div>
        );
      case "/leaderboard":
        return headerButtonsNotHome(() => push("/"));
      default:
        return headerButtonsNotHome(() => push("/"));
    }
  };

  return (
    <>
      <header className="fixed left-0 top-0 flex w-full justify-center h-12 bg-primary text-headerText">
        {renderHeaderButtons()}
      </header>
    </>
  );
};

export default Header;
