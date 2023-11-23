import { useUserPosts } from "@/hooks/useUserPosts";
import { useMbWallet } from "@mintbase-js/react";
import PostCard from "./post-card";

const UserPosts = () => {
  const { activeAccountId } = useMbWallet();

  const accountId = activeAccountId || "";

  const { posts } = useUserPosts(accountId);

  return (
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
  );
};

export default UserPosts;
