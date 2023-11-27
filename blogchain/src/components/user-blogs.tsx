import { useUserBlogs } from "@/hooks/useUserBlogs";
import { useMbWallet } from "@mintbase-js/react";
import BlogCard from "./blog-card";
import { MINTBASE_CONTRACTS } from "@mintbase-js/sdk";

const UserBlogs = () => {
  const { activeAccountId } = useMbWallet();

  const accountId = activeAccountId || "";

  const { blogs } = useUserBlogs(accountId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {blogs?.map(({ id }, index) => (
        <BlogCard
          key={`${id}-${index}`}
          title={id.replace(`.${MINTBASE_CONTRACTS.testnet}`, "")}
          subtitle={id}
          owner={accountId}
        />
      ))}
    </div>
  );
};

export default UserBlogs;
