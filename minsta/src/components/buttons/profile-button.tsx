"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex flex-grow items-center justify-center text-black"
      onClick={() => router.push("/profile")}
    >
      Account
    </button>
  );
};

export default ProfileButton;
