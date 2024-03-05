import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

interface SuccessPageData {
  contractName: string;
  contractPage: string;
  txnHashUrl: string;
}

export function SuccessPage({ data }: { data: SuccessPageData }): JSX.Element {
  const { contractPage, contractName, txnHashUrl } = data;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardDescription>
          Success you just deployed a smart contract!
        </CardDescription>
      </CardHeader>

      <CardContent className="text-center">
        <p className="font-bold">{contractName}</p>
        <Link href="/">
          <Button variant={"link"}>Deploy New Contract</Button>
        </Link>
      </CardContent>

      <CardFooter className="flex gap-4">
        <Link target="_blank" href={txnHashUrl}>
          <Button variant={"secondary"} className="text-xs">
            View Transaction
          </Button>
        </Link>
        <Link target="_blank" href={contractPage}>
          <Button className="text-xs">View Store on Mintbase</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
