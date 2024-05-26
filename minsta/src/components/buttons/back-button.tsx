"use client";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <button
      onClick={goBack}
      className="flex flex-grow items-center justify-center text-black"
    >
      Back
    </button>
  );
};

export default BackButton;
