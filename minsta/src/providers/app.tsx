import useMintImage from "@/utils/useMint";
import { Heebo } from "next/font/google";
import React, { createContext, useContext, useState } from "react";
import "../style/global.css";

const heebo = Heebo({ subsets: ["latin"] });

export const AppContext = createContext<{
  cameraRef: React.MutableRefObject<any> | undefined;
  setCameraRef: (ref: React.MutableRefObject<any> | undefined) => void;
  takePicture: () => void;
  currentPhoto: boolean;
  openModal: (modalType: "default" | "rewards") => void;
  closeModal: () => void;
  isMainModalOpen: boolean;
  isRewardsModalOpen: boolean;
  mintImage: (photo: string) => void;
  isLoading: boolean;
}>({
  cameraRef: undefined,
  setCameraRef: (ref: React.MutableRefObject<any> | undefined) => null,
  takePicture: () => null,
  currentPhoto: false,
  openModal: (modalType: "default" | "rewards") => null,
  closeModal: () => null,
  isMainModalOpen: false,
  isRewardsModalOpen: false,
  mintImage: (photo: string) => null,
  isLoading: false,
});

interface IAppConsumer {
  cameraRef: string | undefined;
  setCameraRef: (ref: React.MutableRefObject<any> | undefined) => void;
  takePicture: () => void;
  currentPhoto: string | undefined;
  openModal: (modalType: "default" | "rewards") => void;
  closeModal: () => void;
  isMainModalOpen: boolean;
  isRewardsModalOpen: boolean;
  mintImage: (photo: string) => void;
  isLoading: false;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cameraRef, _setCameraRef] = useState<
    React.MutableRefObject<any> | undefined
  >(undefined);
  const [currentPhoto, setCurrentPhoto] = useState(false);

  const [isMainModalOpen, setMainModalOpen] = useState(false);
  const [isRewardsModalOpen, setRewardsModalOpen] = useState(false);

  const { mintImage, loading, error } = useMintImage();

  const handleOpenModal = (modalType: string) => {
    if (modalType === "default") {
      setMainModalOpen(true);
    } else if (modalType === "rewards") {
      setRewardsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setMainModalOpen(false);
    setRewardsModalOpen(false);
  };

  const setCameraRef = (ref: React.MutableRefObject<any> | undefined) => {
    _setCameraRef(ref);
  };

  const takePicture = () => {
    setCurrentPhoto(true);
  };

  return (
    <>
      {" "}
      <style jsx global>{`
        html {
          font-family: ${heebo.style.fontFamily};
        }
      `}</style>
      <AppContext.Provider
        value={{
          cameraRef,
          setCameraRef,
          takePicture,
          currentPhoto,
          openModal: handleOpenModal,
          closeModal: handleCloseModal,
          isMainModalOpen,
          isRewardsModalOpen,
          mintImage: mintImage,
          isLoading: loading,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

// @ts-ignore
export const useApp = () => useContext<IAppConsumer>(AppContext);
