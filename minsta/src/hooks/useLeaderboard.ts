import { isUndefined } from "lodash";
import { useMemo } from "react";
import { useMbWallet } from "@mintbase-js/react";
import { constants } from "@/constants";
import { useApp } from "@/providers/app";
import { MINSTA_TEXTS } from "@/data/fallback";
import { useGraphQlQuery } from "@/data/useGraphQlQuery";

interface LeaderboardData {
  token: {
    ownerId: string;
  }[];
}

const FetchLeaderboard = `
  query FetchLeaderboard($contractAddress: String) @cached {
    token: mb_views_nft_tokens(
      where: { nft_contract_id: { _eq: $contractAddress } }
    ) {
      ownerId: owner
    }
  }
`;

export const useLeaderBoardData = () => {
  const queryObj = {
    queryName: "q_FetchLeaderboard",
    query: FetchLeaderboard,
    variables: { contractAddress: constants.tokenContractAddress },
    queryOpts: { staleTime: Infinity },
  };

  const { data, isLoading: loading } = useGraphQlQuery<LeaderboardData>(queryObj);

  const texts = {
    prizes: {
      one: process.env.NEXT_PUBLIC_TEXT_PRIZE_1ST_VAL || MINSTA_TEXTS.prizes.one,
      two: process.env.NEXT_PUBLIC_TEXT_PRIZE_2ND_VAL || MINSTA_TEXTS.prizes.two,
      three: process.env.NEXT_PUBLIC_TEXT_PRIZE_3RD_VAL || MINSTA_TEXTS.prizes.three,
      title_one: process.env.NEXT_PUBLIC_TEXT_PRIZE_1ST_TITLE || MINSTA_TEXTS.prizes.title_one,
      title_two: process.env.NEXT_PUBLIC_TEXT_PRIZE_2ND_TITLE || MINSTA_TEXTS.prizes.title_two,
      title_three: process.env.NEXT_PUBLIC_TEXT_PRIZE_3RD_TITLE || MINSTA_TEXTS.prizes.title_three,
    },
  };

  const { activeAccountId } = useMbWallet();

  const { openModal } = useApp();

  const leaderboard = useMemo(() => {
    if (loading || !data?.token) return [];

    const accounts = data.token;

    const leaderboardResult = accounts?.reduce(
      (acc: Record<string, number>, token: any) => {
        const { ownerId } = token;

        const notExist = isUndefined(acc[ownerId]) || isNaN(acc[ownerId]);

        if (notExist) {
          acc[ownerId] = 1;
        } else {
          acc[ownerId] = acc[ownerId] + 1;
        }

        return acc;
      },
      {}
    );

    const resultArray = Object.keys(leaderboardResult || {})
      .map((key) => {
        return {
          count: leaderboardResult[key],
          account: key,
        };
      })
      .sort((a, b) => {
        return b.count - a.count;
      });

    return resultArray;
  }, [data, loading]);

  return { texts, leaderboard, openModal, activeAccountId };
};
