import { Hammer, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="flex justify-center items-center bg-white p-4 border-t">
      <Link href="https://mintbase.xyz" target="_blank">
        <Button variant="outline">
          <Wrench className="mr-2 h-4 w-4" /> Mintbase
        </Button>
      </Link>
    </div>
  );
};

export default Footer;
