"use client";

import { useLatestBlogs } from "@/hooks/useLatestBlogs";
import BlogCard from "./blog-card";
import { MINTBASE_CONTRACTS } from "@mintbase-js/sdk";

const LatestBlogs = () => {
  const { contracts } = useLatestBlogs();

  return (
    <div className="px-4 mb-4">
      <div className="text-2xl font-bold mb-4">Latest Blogs</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts?.map(
          ({ nft_contract_id: id, nft_contract_owner_id: owner }, index) => (
            <BlogCard
              key={`${id}-${index}`}
              title={id.replace(`.${MINTBASE_CONTRACTS.testnet}`, "")}
              subtitle={id}
              owner={owner}
            />
          )
        )}
      </div>
    </div>
  );
};

export default LatestBlogs;
