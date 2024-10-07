"use client";

import { useMbWallet } from "@mintbase-js/react";
import { useRouter } from "next/navigation";
import { LeaderboardPage } from "./pages/leaderboard";

export const HomePage = () => {
  const { connect, isConnected } = useMbWallet();
  const router = useRouter();

  return (
    <main className="px-4 lg:px-12 mx-auto flex flex-col items-center justify-center space-y-2">
      <div className="text-3xl font-bold mt-20">Hackaton Center: Mint dynamic NFTs that evolve as you level up</div>
      <LeaderboardPage />
    </main>
  );
};
