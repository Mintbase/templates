"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const LogoButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex flex-grow items-center justify-center rounded-full text-black"
      onClick={() => router.push('/')}
    >
      Logo
    </button>
  );
};

export default LogoButton;