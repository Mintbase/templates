"use client";

import { CreatePostDialog } from "@/components/create-post";
import UserPosts from "@/components/user-posts";

export default function MyPosts() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 mt-12 px-12">
      <CreatePostDialog />
      <UserPosts />
    </main>
  );
}
