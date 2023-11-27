import Hero from "@/components/hero";
import LatestBlogs from "@/components/latest-blogs";
import LatestPosts from "@/components/latest-posts";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-2 lg:px-24 py-12">
      <Hero />
      <LatestBlogs />
      <LatestPosts />
    </main>
  );
}
