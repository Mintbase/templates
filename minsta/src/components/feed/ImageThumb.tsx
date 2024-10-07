"use client";

import React, { useState } from "react";
import { constants } from "@/constants";

import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/utils/imageUrl";

const ImageThumb = ({ token, index }: any) => {
  const imageUrl = token?.media;
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error)
    return (
      <div className=" aspect-square flex flex-wrap	 p-10 w-72 h-72 xl:w-80 xl:h-80 relative justify-center items-center text-center bg-gray-200 w-full">
        <div>
          <h1 className="w-full"> No Image Metadata</h1>
          <p className="text-xs text-gray-600 w-full">
            There was an Error with the image.
          </p>
        </div>
      </div>
    );

  if (imageUrl) {
    const finalUrl = getImageUrl(imageUrl);

    return (
      <div className=" aspect-square  sm:w-full md:w-72 h-72 xl:w-80 xl:h-80 relative">
        <Link
          key={`${token?.metadata_id}-${index}`}
          href={`meta/${token?.metadata_id}`}
          rel="noopener noreferrer"
          passHref
        >
          <Image
            key={token?.metadata_id}
            src={`https://image-cache-service-z3w7d7dnea-ew.a.run.app/thumbnail?url=${finalUrl}`}
            alt={`Token ${index}`}
            className="object-cover h-full w-full"
            width={320}
            height={320}
            quality={70}
            priority={index < 5}
            onError={handleError}
            placeholder="empty"
            unoptimized
          />
          <button
            className="absolute top-3 right-3 bg-black text-white rounded p-1 text-xs px-2 py-1.5"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                `https://twitter.com/intent/tweet?url=%0aCheck%20out%20mine%3A%20${
                  window.location.origin
                }/meta/${decodeURIComponent(
                  token?.metadata_id
                )}%2F&via=mintbase&text=${constants.twitterText}`,
                "_blank"
              );
            }}
          >
            Share
          </button>
        </Link>
      </div>
    );
  } else {
    return null;
  }
};

export const MemoizedImageThumb = React.memo(ImageThumb);
