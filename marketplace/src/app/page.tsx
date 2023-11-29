import LandingPage from "@/components/Landing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mintbase Simple Marketplace Example",
  description: "Simple Marketplace",
};

export default function Home() {
  return (
    <main className="px-24 py-12">
      <LandingPage />
    </main>
  );
}
