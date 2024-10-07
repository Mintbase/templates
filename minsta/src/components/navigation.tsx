"use client";
import { usePathname } from "next/navigation";
import BackButton from "./buttons/back-button";
import LeaderboardButton from "./buttons/leaderboard-button";
import LogoButton from "./buttons/logo-button";
import ProfileButton from "./buttons/profile-button";

const Navigation = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
      {children}
    </div>
  );
};

export default Navigation;
