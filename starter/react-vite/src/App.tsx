import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import "./App.css";
import { NearWalletConnector } from "./NearWalletConnector";
import "./shims";

function App() {

  const MintbaseWalletSetup = {
    contractAddress: "hellovirtualworld.mintspace2.testnet",
    network: "testnet",
    callbackUrl: "http://localhost:3000",
  };

  return (
    <MintbaseWalletContextProvider {...MintbaseWalletSetup}>
      <main className="flex flex-col items-center justify-center mt-2">
        <div className="mx-6 sm:mx-24 mt-4 mb-4">
          <div className="w-full flex flex-col justify-center items-center">
            <div className="w-full flex flex-col justify-center items-center space-y-8">
              <div className="flex flex-col justify-center items-center space-y-8 text-[40px]">
                Mintbase.js Simple Login Example
              </div>
              <NearWalletConnector />
            </div>
          </div>
        </div>
      </main>
    </MintbaseWalletContextProvider>
  );
}

export default App;
