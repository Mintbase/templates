import { VerifiedUser } from "@mui/icons-material";
import {
  Avatar,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { copyToClipboard } from "@/utils/messages";

type ChatResponse = {
  item: any;
  index: number;
  messages: any;
  reload: any;
};

const ChatResponses: React.FC<ChatResponse> = ({
  item,
  index,
  messages,
  reload,
}) => {
  return (
    <Grid key={item?.id} container>
      <Grid item p={2}>
        <Stack direction="row" spacing={2}>
          <Avatar
            sx={{ width: "25px", height: "25px" }}
            src={item?.role === "user" ? `${(<VerifiedUser />)}` : "/mb.png"}
          ></Avatar>
          <Stack direction="column">
            <Typography fontWeight={400}>
              {item?.role === "user" ? `You` : `Assistant`}
            </Typography>
            <Paper elevation={0}>
              <Typography
                variant="subtitle2"
                color={item?.role === "user" ? "" : "text.secondary"}
              >
                {item?.content}
              </Typography>
              <Paper elevation={0}>
                {
                  <>
                    {messages.length - 1 === index && item.role !== "user" && (
                      <IconButton
                        size="small"
                        disableRipple={true}
                        sx={{ color: "black" }}
                      >
                        <Tooltip title="Regenerate response">
                          <ReplayIcon
                            sx={{ fontSize: "15px" }}
                            onClick={() => reload()}
                          />
                        </Tooltip>
                      </IconButton>
                    )}
                    <IconButton
                      size="small"
                      disableRipple={true}
                      sx={{ color: "black" }}
                    >
                      <Tooltip title="Copy content">
                        <ContentCopyIcon
                          sx={{ fontSize: "15px" }}
                          onClick={() => copyToClipboard(item?.content)}
                        />
                      </Tooltip>
                    </IconButton>
                  </>
                }
              </Paper>
            </Paper>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};
export default ChatResponses;
