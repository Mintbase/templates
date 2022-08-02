import type { NextPage } from "next";
import Header from "../containers/Marketplace/components/Header";
import HeroSection from "../containers/Marketplace/components/HeroSection";
import Items from "../containers/Marketplace/components/Items";

const Store: NextPage = () => {
  return (
    <div className="flex flex-1 flex-col min-h-screen text-gray-500">
      <Header />
      <div className="mx-24 mt-4">
        <HeroSection />
      </div>
      <div className="flex w-full">
        <Items />
      </div>
    </div>
  );
};

export default Store;
