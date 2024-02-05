import { NearWalletConnector } from "@/components/NearWalletSelector";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mintbase Starter with Next.js",
  description: "Simple Login with Next.js 14",
};

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center justify-center mt-2">
        <div className="mx-6 sm:mx-24 mt-4 mb-4">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center space-y-8">
              <div className="flex flex-col justify-center items-center space-y-8 text-[40px]">
                Mintbase.js Simple Login Example
              </div>
              <NearWalletConnector />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
