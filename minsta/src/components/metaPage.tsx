"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import Link from "next/link";
import { constants } from "@/constants";
import InlineSVG from "react-inlinesvg";
import { getImageUrl } from "@/utils/imageUrl";

export const MetaPage = ({ meta, slug }: any) => {
  const finalUrl = getImageUrl(meta?.data?.nft_metadata?.[0]?.media);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "linear" }}
      className="flex wrap flex-col h-full w-5/6 mb-[30px] pt-20 md:w-[468px] m-auto"
    >
      <div className="md:w-[468px] md:h-[468px] relative">
        <Image
          alt={meta?.data?.nft_metadata?.[0]?.title}
          src={finalUrl}
          width="468"
          height="468"
        />
        <button
          className="absolute top-3 right-3 bg-black text-white rounded p-1 text-xs px-2 py-1.5"
          onClick={(e) => {
            e.preventDefault();
            window.open(
              `https://twitter.com/intent/tweet?url=%0aCheck%20out%20mine%3A%20${
                window.location.origin
              }/meta/${decodeURIComponent(slug)}%2F&via=mintbase&text=${
                constants.twitterText
              }`,
              "_blank"
            );
          }}
        >
          Share
        </button>
      </div>
      <h2 className="font-semibold	py-5 leading-7 text-mainText text-[24px]">
        {" "}
        {meta?.data?.nft_metadata?.[0]?.title}
      </h2>
      <h3 className="text-[14px] mb-4 text-mainText">
        {" "}
        {meta?.data?.nft_metadata?.[0]?.description}
      </h3>
      <p className="text-[14px] text-mainText">
        {" "}
        Owner:{" "}
        <Link
          target="_blank"
          href={`https://www.mintbase.xyz/human/${meta?.data?.owners?.[0]?.owner}`}
          className="text-linkColor"
        >
          {" "}
          {meta?.data?.owners?.[0]?.owner}{" "}
        </Link>
      </p>
      <p className="text-[14px] text-mainText mb-4">
        {" "}
        Contract:{" "}
        <Link
          target="_blank"
          href={`https://www.mintbase.xyz/contract/${meta?.data?.nft_metadata?.[0]?.nft_contract_id}`}
          className="text-linkColor"
        >
          {" "}
          {meta?.data?.nft_metadata?.[0]?.nft_contract_id}{" "}
        </Link>
      </p>
      <div className="flex gap-2 items-center">
        <Link
          target="_blank"
          rel="noopener noreferrer"
          passHref
          href={`${constants.mintbaseBaseUrl}/meta/${slug}`}
          className="text-linkColor text-sm"
        >
          View on Mintbase
        </Link>
        <InlineSVG
          src="/images/link_arrow.svg"
          className="fill-current text-linkColor"
        />
      </div>
    </motion.div>
  );
};
