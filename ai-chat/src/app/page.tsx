
import Chat from "@/components/chat";
import CreditsCounter from "@/components/credits";
import { WalletProvider } from "@/components/providers/MintbaseWalletProvider";
import { SocialMedias } from "@/components/social";

export default function Home() {
  return (
    <WalletProvider>
      <div className="relative">
        <div className="absolute bottom-[85px] left-0 z-50 px-4 text-white">
          <CreditsCounter></CreditsCounter>
        </div>
        <Chat />
      </div>
    </WalletProvider>
  );
}
