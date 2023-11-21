import Chat from "@/components/chat";
import { WalletProvider } from "@/components/providers/MintbaseWalletProvider";

export default function Home() {
  return (
    <WalletProvider>
      <Chat />
    </WalletProvider>
  );
}
