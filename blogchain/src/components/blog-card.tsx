import Link from "next/link";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

const BlogCard = ({
  title,
  subtitle,
  owner,
}: {
  title: string;
  subtitle: string;
  owner: string;
}) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle className="w-11/12 truncate text-lg">{title}</CardTitle>
        <CardDescription className="11/12 truncate">{subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarFallback>{owner[0]}</AvatarFallback>
              </Avatar>
              <p className="mt-0 text-xs w-2/3 truncate">{owner}</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Link href={`/blog/${subtitle}`}>
          <Button>Visit</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
