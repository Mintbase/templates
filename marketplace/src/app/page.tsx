import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mintbase Simple Marketplace Example",
  description: "Simple Marketplace",
};

export default function Home() {
  return (
    <>
      <main className="px-24 py-12">
        <div className="w-full flex flex-col items-start gap-4">
          <div className="text-[40px]">Mintbase Simple Marketplace Example</div>
          <div>
            <p>
              1. Make sure to change the env NEXT_PUBLIC_AFFILIATE_ACCOUNT to
              your own NEAR account
            </p>
            <p>2. On purchase, see your account pop up on the leaderboard</p>
            <p>3. Check your wallet balance to see funds go up!</p>
            <div className="mt-4 flex">
              <a
                target="_blank"
                rel="noreferrer"
                href="https://mintbase.xyz/leaderboard"
              >
                <button className="bg-black text-white rounded p-3">
                  See Leaderboard
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
