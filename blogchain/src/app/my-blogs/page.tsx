"use client";

import { CreateBlogDialog } from "@/components/create-blog";
import UserBlogs from "@/components/user-blogs";

export default function MyBlogs() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 px-2 lg:px-24 py-12">
      <CreateBlogDialog />
      <UserBlogs />
    </main>
  );
}
