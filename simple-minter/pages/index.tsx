import type { NextPage } from "next";
import Header from "../containers/Minter/components/Header";
import Main from "../containers/Minter/components/Main";

const Minter: NextPage = () => {

  return (
    <div className="flex flex-1 flex-col min-h-screen text-gray-500">
      <Header />
      <div className="mx-24 mt-4">
        <Main />
      </div>
    </div>
  );
};

export default Minter;
