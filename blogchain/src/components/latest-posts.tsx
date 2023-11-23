"use client";

import { useLatestPosts } from "@/hooks/useLatestPosts";
import PostCard from "./post-card";

const LatestPosts = () => {
  const { posts } = useLatestPosts();

  return (
    <div className="px-4">
      <div className="text-2xl font-bold mb-4">Latest Posts</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts?.map(
          (
            { metadata_id, description, media, title, minted_timestamp },
            index
          ) => (
            <PostCard
              key={`${metadata_id}-${index}`}
              id={metadata_id}
              title={title}
              description={description}
              media={media}
              createdAt={minted_timestamp}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LatestPosts;
