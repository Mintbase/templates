"use client";

import { CreateBlogDialog } from "@/components/create-blog";
import UserBlogs from "@/components/user-blogs";

export default function MyBlogs() {
  return (
    <main className="flex min-h-screen flex-col items-start gap-4 mt-12 px-12">
      <CreateBlogDialog />
      <UserBlogs />
    </main>
  );
}
