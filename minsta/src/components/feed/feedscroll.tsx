import { FETCH_FEED } from "@/data/queries/feed.graphl";
import useInfiniteScrollGQL from "@/hooks/useInfiniteScroll";
import { useMemo, useRef } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import { MemoizedImageThumb } from "./ImageThumb";

export const FeedScroll = ({ blockedNfts }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  const { items, loadingItems, total, error } = useInfiniteScrollGQL(
    "q_FETCH_FEED",
    isVisible,
    { query: FETCH_FEED }
  );

  const memoizedData = useMemo(() => {
    const uniqueMetadataIds = new Set<string>();

    const filteredData = items?.filter((token: any) => {
      if (uniqueMetadataIds.has(token.metadata_id)) {
        return false;
      }

      uniqueMetadataIds.add(token.metadata_id);

      // Move the filtering logic here
      if (!!blockedNfts && blockedNfts?.includes(token?.metadata_id)) {
        return false;
      }

      return true;
    });

    return filteredData;
  }, [blockedNfts, items]);

  if (error) {
    return (
      <div className="text-mainText text-xl inline-block ">
        {" "}
        Error. <br /> Please contact Mintbase Team at{" "}
        <a className="block underline" href="https://t.me/mintdev">
          {" "}
          Mintbase DEV Telegram
        </a>
      </div>
    );
  }

  return (
    <>
      {memoizedData?.map((token: any, index: number) => {
        return (
          <MemoizedImageThumb
            key={token?.metadata_id}
            token={token}
            index={index}
          />
        );
      })}
      <div ref={ref}>
        {loadingItems?.map((item, i) => (
          <div
            className="md:aspect-square rounded overflow-x-hidden cursor-pointer sm:w-full md:w-72 h-72 xl:w-80 xl:h-80 relative"
            key={`${item}-${i}`}
          >
            <div className="rounded animate-pulse w-full h-full bg-gray-600 dark:bg-gray-800" />
          </div>
        ))}
      </div>
    </>
  );
};
