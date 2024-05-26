import { constants } from "@/constants";
import { usePathname } from "next/navigation";

const MintingClosed = () => {
  const pathname = usePathname();
  const { isClosed } = constants;

  return isClosed && !pathname.includes("meta") ? (
    <div className="text-center text-mainText w-full absolute left-0 right-0 notify text-sm font-sans">
      Minting is closed. Thanks to everyone who participated.
    </div>
  ) : null;
};

export default MintingClosed;
