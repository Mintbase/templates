"use client";
import { useEffect, useState } from "react";

const CreditsCounter = () => {
  const [credits, setCredits] = useState(0);
  const url =
    "https://mintbase-wallet-git-ai-relayer-credits-mintbase.vercel.app/api/credits?accountId=fixed-bytebender.mintbase.testnet";

  const fetchCredits = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setCredits(data?.credits);
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  };

  useEffect(() => {
    fetchCredits(); // Fetch immediately on component mount

    const interval = setInterval(fetchCredits, 2000); // Set up an interval to fetch every 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="flex gap-2 py-2 items-center">
      <div className="text-sm">Credits</div>
      <span className="text-sm font-bold">{credits}</span>
    </div>
  );
};

export default CreditsCounter;
