"use client";

import { MINSTA_TEXTS } from "@/data/fallback";
import { useApp } from "@/providers/app";
import { useMbWallet } from "@mintbase-js/react";
import React, { useEffect } from "react";
import InlineSVG from "react-inlinesvg";

const Modal = ({ children }: { children?: React.ReactNode }) => {
  const { isMainModalOpen, closeModal } = useApp();
  const { connect, isConnected } = useMbWallet();

  const texts = {
    about: {
      first: process.env.NEXT_PUBLIC_TEXT_ABOUT_1ST || MINSTA_TEXTS.about.first,
      sec: process.env.NEXT_PUBLIC_TEXT_ABOUT_2ND || MINSTA_TEXTS.about.sec,
      third: process.env.NEXT_PUBLIC_TEXT_ABOUT_3RD || MINSTA_TEXTS.about.third,
    },
  };

  useEffect(() => {
    if (!isMainModalOpen) return;
    // Disable scrolling on the background (body) when the modal is open
    document.body.style.overflow = "hidden";
    return () => {
      // Re-enable scrolling when the modal is closed
      document.body.style.overflow = "auto";
    };
  }, [isMainModalOpen]);

  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  if (!isMainModalOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70 md:p-18 px-4"
      onClick={closeModal}
    >
      <div
        className="bg-mainBg rounded-xl shadow-lg max-w-md mx-auto flex flex-col h-auto"
        onClick={stopPropagation}
      >
        <div className="overflow-y-auto flex-1 h-auto w-full rounded-t-lg text-modalText p-5 max-w-md mx-auto overflow-y-auto flex flex-col">
          <div className="mb-8 flex flex-col gap-2 items-center mt-4">
            <h1 className="text-3xl font-bold">
              {process.env.NEXT_PUBLIC_APP_TITLE || "Minsta"}
            </h1>
          </div>

          <div className="text-modalText flex flex-col gap-8 items-start mb-12">
            <div className="flex gap-3 items-center">
              <InlineSVG
                src="/images/photo_camera-2.svg"
                className="fill-current text-icon"
              />
              <p className="text-sm">{texts.about.first}</p>
            </div>
            <div className="flex gap-3 items-center">
              <InlineSVG
                src="/images/file_arrow_up.svg"
                className="fill-current text-icon"
              />
              <p className="text-sm">{texts.about.sec}</p>
            </div>
            <div className="flex gap-3 items-center">
              <InlineSVG
                src="/images/trophy.svg"
                className="fill-current text-icon"
              />
              <p className="text-sm">{texts.about.third}</p>
            </div>
          </div>

          <div
            className={`mb-14 text-center justify-center ${
              isConnected ? "flex gap-8 mt-8" : ""
            }`}
          >
            <button
              className="gradientButton text-primaryBtnText rounded px-14 py-3 text-sm font-light"
              onClick={!isConnected ? () => connect() : () => closeModal()}
            >
              OK
            </button>
          </div>

          <div>
            <p className="uppercase text-xs mb-1.5 text-center">POWERED BY</p>
            <div className="flex justify-center gap-5">
              <InlineSVG
                src="/images/MB_logo.svg"
                className="fill-current text-modal"
              />
              <InlineSVG
                src="/images/near_logo.svg"
                className="fill-current text-modal"
              />
            </div>
          </div>
        </div>

        <div className="w-full text-freeUseText bg-bgFreeUse text-center py-2 text-sm px-5 rounded-b-lg">
          100% free to use: no credit card or crypto required!
        </div>
      </div>
    </div>
  );
};

export default Modal;
