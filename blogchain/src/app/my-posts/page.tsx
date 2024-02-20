"use client";

import { CreatePostDialog } from "@/components/create-post";
import UserPosts from "@/components/user-posts";

export default function MyPosts() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 px-2 lg:px-24 py-12">
      <CreatePostDialog />
      <UserPosts />
    </main>
  );
}
