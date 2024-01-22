"use client";
import { useMbWallet } from "@mintbase-js/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import DarkModeToggle from "./DarkModeToggle";
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
        <img src="/blogchain.png" className="w-8 h-8" />
        <div className="text-black font-bold hidden sm:block">BLOGCHAIN</div>
      </Link>
      <div className="flex gap-5">
        <DarkModeToggle />
        {isConnected ? (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="outline">{activeAccountId}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <Link href="/my-blogs">
                <DropdownMenuItem className="cursor-pointer">
                  My Blogs
                </DropdownMenuItem>
              </Link>
              <Link href="/my-posts">
                <DropdownMenuItem className="cursor-pointer">
                  My Posts
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleSignout}
              >
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button variant="outline" onClick={handleSignIn}>
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};

export default Header;
