import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/lib/utils";

const PostCard = ({
  id,
  title,
  description,
  media,
  createdAt,
}: {
  id: string;
  title: string;
  description: string;
  media: string;
  createdAt: string;
}) => {
  const postDate = formatDate(createdAt);

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="aspect-video">
        <img
          className="rounded-t-lg w-full h-full object-cover"
          src={media}
          alt={`${title}-post`}
        />
      </div>
      <div className="p-5">
        <Badge>{postDate}</Badge>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          <ReactMarkdown>
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </ReactMarkdown>
        </p>
        <Link href={`/post/${id}`}>
          <Button>Read more</Button>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
