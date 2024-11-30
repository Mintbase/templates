import StopCircleIcon from "@mui/icons-material/StopCircle";
import { IconButton, InputBase, Stack, Tooltip } from "@mui/material";

type ChatAction = {
  isLoading: boolean;
  isConnected: boolean;
  stop: any;
  getFieldProps: any;
};

const ChatActions: React.FC<ChatAction> = ({
  isLoading,
  isConnected,
  getFieldProps,
  stop,
}) => {
  return (
    <Stack direction="row" spacing={1} p={2}>
      <InputBase
        {...getFieldProps("message")}
        disabled={!isConnected && isLoading}
        fullWidth
        size="medium"
        sx={{ ml: 1 }}
        placeholder={isLoading ? "Generating response....." : "Type a message"}
      />
      <IconButton
        disableRipple={true}
        sx={{ color: "black" }}
        disabled={!isConnected}
      >
        {isLoading && (
          <Tooltip title="Stop generating">
            <StopCircleIcon onClick={stop} />
          </Tooltip>
        )}
      </IconButton>
    </Stack>
  );
};
export default ChatActions;
