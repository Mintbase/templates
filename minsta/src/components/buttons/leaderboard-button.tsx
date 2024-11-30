"use client";
import React from "react";
import { useRouter } from "next/navigation";

const LeaderboardButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/leaderboard");
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-grow items-center justify-center text-black"
    >
      Leaderboard
    </button>
  );
};

export default LeaderboardButton;
