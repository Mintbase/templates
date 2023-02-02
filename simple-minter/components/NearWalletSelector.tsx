import { useWallet } from "@mintbase-js/react";
import { MbButton } from "mintbase-ui";

export const NearWalletConnector = () => {
  const { connect, disconnect, activeAccountId, isConnected } = useWallet();

  if (!isConnected) {
    return <MbButton onClick={connect} label={"Connect To NEAR"} />;
  }

  return (
    <div>
      <p>You are connected as {activeAccountId}</p>
      <div className="flex justify-center items-center mt-4">
        <MbButton onClick={disconnect} label={"Disconnect"} />
      </div>
    </div>
  );
};
