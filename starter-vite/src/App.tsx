import { BitteWalletContextProvider } from "@mintbase-js/react";
import "./App.css";
import { NearWalletConnector } from "./NearWalletConnector";
import "./shims";
import { SocialMedias } from "./Social";

import "@near-wallet-selector/modal-ui/styles.css";

function App() {
  const setup = {
    contractAddress:
      import.meta.env.VITE_CONTRACT_ADDRESS || "mintspace2.testnet",
    network: import.meta.env.VITE_NETWORK || "testnet",
    callbackUrl:
      import.meta.env.VITE_CALLBACK_URL ||
      (typeof window !== "undefined" ? window.location.origin : ""),
  };

  return (
    <>
      <SocialMedias />

      <BitteWalletContextProvider {...setup}>
        <main className="flex flex-col items-center justify-center mt-2 root">
          <div className="mx-6 sm:mx-24 mt-4 mb-4">
            <div className="w-full flex flex-col justify-center items-center">
              <div className="w-full flex flex-col justify-center items-center space-y-8">
                <div className="flex flex-col justify-center items-center space-y-8 text-[40px]">
                 Bitte Wallet Simple Login Example
                </div>
                <NearWalletConnector />
              </div>
            </div>
          </div>
        </main>
      </BitteWalletContextProvider>
    </>
  );
}

export default App;
