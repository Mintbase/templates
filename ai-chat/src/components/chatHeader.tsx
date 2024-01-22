import { chatSelector } from "@/store/features/chat/chatSlice";

import { useAppSelector } from "@/store/hooks";
import { getDateFormat } from "@/utils/datetime";
import { useMbWallet } from "@mintbase-js/react";
import {
  Avatar,
  Button,
  CardHeader,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

const ChatHeader: React.FC = () => {
  const lg = useMediaQuery("(max-width:510px)");
  const { connect, disconnect, isConnected } = useMbWallet();

  const { status } = useAppSelector(chatSelector);
  const { credits } = status;

  return (
    <CardHeader
      sx={{ p: 3 }}
      avatar={
        isConnected && (
          <Avatar src="/mb.png">
            <Typography variant="subtitle2">{`CA`}</Typography>
          </Avatar>
        )
      }
      title={isConnected && !lg && "Assistant"}
      subheader={isConnected && !lg && `${getDateFormat()}`}
      action={
        <Stack direction="row" spacing={3} alignItems="center">
          {isConnected && (
            <Paper elevation={0}>
              <Typography
                sx={{ p: 1 }}
                variant="subtitle1"
                color="green"
              >{`Credits: ${credits}`}</Typography>
            </Paper>
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
      }
    />
  );
};
export default ChatHeader;
