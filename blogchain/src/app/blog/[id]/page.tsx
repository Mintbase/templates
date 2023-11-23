"use client";

import { CreatePostDialog } from "@/components/create-post";
import PostCard from "@/components/post-card";
import UserPosts from "@/components/user-posts";
import { useBlogPosts } from "@/hooks/useBlogPosts";
import { useParams } from "next/navigation";

export default function BlogDetail() {
  const { id } = useParams();

  const { posts } = useBlogPosts(id as string);

  return (
    <main className="flex min-h-screen flex-col items-start gap-4 mt-12 px-12">
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
    </main>
  );
}
