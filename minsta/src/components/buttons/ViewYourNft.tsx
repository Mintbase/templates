"use client";
import React from "react";
import Link from "next/link";
import { constants } from "@/constants";
import { useMbWallet } from "@mintbase-js/react";
import InlineSVG from "react-inlinesvg";

const ViewYourNfts = () => {
  const { activeAccountId, isConnected } = useMbWallet();

  return isConnected ? (
    <div className="flex gap-2 items-center">
      <Link
        target="_blank"
        rel="noopener noreferrer"
        passHref
        href={`${constants.mintbaseBaseUrl}/human/${activeAccountId}/owned/0`}
        className="text-linkColor text-sm"
      >
        View your NFTs
      </Link>
      <InlineSVG
        src="/images/link_arrow.svg"
        className="fill-current text-linkColor"
      />
    </div>
  ) : null;
};

export default ViewYourNfts;
