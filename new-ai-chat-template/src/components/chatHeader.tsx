import { chatSelector } from "@/store/features/chat/chatSlice";
import { useAppSelector } from "@/store/hooks";
import { useMbWallet } from "@mintbase-js/react";
import { Box, Button, Stack, Typography } from "@mui/material";

const ChatHeader: React.FC = () => {
  const { connect, disconnect, isConnected } = useMbWallet();

  const { status } = useAppSelector(chatSelector);
  const { credits } = status;

  return (
    <Stack
      direction="row"
      spacing={3}
      alignItems="center"
      justifyContent="flex-end"
    >
      {isConnected && (
        <Typography
          variant="subtitle1"
          color="green"
        >{`Credits: ${credits}`}</Typography>
      )}
      <Button
        variant="contained"
        color={isConnected ? "error" : "primary"}
        size="small"
        onClick={() => {
          isConnected ? disconnect() : connect();
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </Stack>
  );
};
export default ChatHeader;
