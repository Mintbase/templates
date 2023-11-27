import Chat from "@/components/chat";
import CreditsCounter from "@/components/credits";
import { WalletProvider } from "@/components/providers/MintbaseWalletProvider";

export default function Home() {
  return (
    <WalletProvider>
      <div className="relative">
        <div className="absolute top-0 right-0 z-50 px-4 bg-black text-white">
          <CreditsCounter></CreditsCounter>
        </div>
        <Chat />
      </div>
    </WalletProvider>
  );
}
