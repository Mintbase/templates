import { Container } from "@mui/material";
import Chat from "@/components/chat";
import { CALLBACK_URL } from "@/constants";
import "@near-wallet-selector/modal-ui/styles.css";
import { MintbaseWalletContextProvider } from "@mintbase-js/react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function Home() {
  //<MintbaseWalletContextProvider/>Refrence taken from NPM.
  return (
    <Provider store={store}>
      <MintbaseWalletContextProvider
        contractAddress={"testnet"}
        network={"testnet"}
        callbackUrl={CALLBACK_URL}
      >
        <Chat />
      </MintbaseWalletContextProvider>
    </Provider>
  );
}
