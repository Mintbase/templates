"use client";

import { useMbWallet } from "@mintbase-js/react";
import { CreateBlogDialog } from "./create-blog";
import { CreatePostDialog } from "./create-post";

const Hero = () => {
  const { isConnected, connect } = useMbWallet();

  const handleSignIn = async () => {
    return connect();
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="grid max-w-screen-xl px-4 py-8 lg:py-0 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Your forever thoughts on the Blockchain
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Transform Blogs into Smart Contracts, Posts into NFTs - Your
            Content, Your Blockchain Legacy.
          </p>
          {isConnected ? (
            <div className="flex gap-4">
              <CreateBlogDialog />
              <CreatePostDialog />
            </div>
          ) : (
            <div
              className="px-5 py-3 mr-3 text-base font-medium text-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 inline-flex cursor-pointer"
              onClick={handleSignIn}
            >
              Get started
            </div>
          )}
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex justify-end">
          <img src="/book.png" alt="book" width={400} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
