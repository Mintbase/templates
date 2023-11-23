"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useGetBlogPostMetadata } from "@/hooks/useGetBlogPostMetadata";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function PostDetail() {
  const { id } = useParams();
  const { post } = useGetBlogPostMetadata(decodeURIComponent(id as string));

  const postDate = formatDate(post?.minted_timestamp);

  return post ? (
    <main className="flex min-h-screen flex-col gap-4 my-12 px-8 md:px-24 w-full md:w-7/12 mx-auto">
      <div className="rounded-lg border w-full h-72 overflow-hidden">
        <img
          src={post.media}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <Badge>{postDate}</Badge>
      </div>
      <div>
        <div className="text-4xl md:text-5xl xl:text-6xl font-bold">
          {post.title}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Link
          href={`https://testnet.mintbase.xyz/contract/${post.nft_contract_id}`}
          target="_blank"
          className="flex gap-2 items-center text-xs"
        >
          <div>{post.nft_contract_id}</div>
        </Link>
        <Link
          href={`https://testnet.mintbase.xyz/human/${post.minter}`}
          target="_blank"
          className="flex gap-2 items-center text-xs"
        >
          <Avatar className="w-6 h-6">
            <AvatarFallback>{post.minter[0]}</AvatarFallback>
          </Avatar>
          <div>{post.minter}</div>
        </Link>
      </div>
      <div className="mt-4 whitespace-pre-line">
        <ReactMarkdown>{post.description}</ReactMarkdown>
      </div>
    </main>
  ) : null;
}
