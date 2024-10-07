import { getBlockedNfts } from "@/data/getBlockedNfts";
import { useQuery } from "@tanstack/react-query";

export const useBlockedNfts = () => {
  const { data: blockedNfts } = useQuery(
    ["q_getBlockedNfts"],
    () => getBlockedNfts(),
    {
      initialData: null, // Set initial data as null
      refetchInterval: 30000, // Automatically refetch every 120000 (2mins)
    }
  );

  return { blockedNfts };
};