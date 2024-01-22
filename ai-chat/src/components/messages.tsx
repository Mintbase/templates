import { useMbWallet } from "@mintbase-js/react";
import {
  Alert,
  Avatar,
  Box,
  CardContent,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
  CardActions,
  IconButton,
  InputBase,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Send } from "@mui/icons-material";
import { Form, FormikProvider, useFormik } from "formik";
import { useChat } from "ai/react";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchCredits } from "@/store/features/chat/thunks/chatThunk";
import { getDateFormat } from "@/utils/datetime";
import { botBox, scrollbar, userBox } from "@/utils/chatBoxStyle";
import { ALERT_WARNING } from "@/constants";

const Messages: React.FC = () => {
  const { isConnected } = useMbWallet();
  const dispatch = useAppDispatch();

  const { append, messages } = useChat({
    api: "/api/chatMessages",
  });

  const formik = useFormik({
    initialValues: {
      message: "",
    },
    onSubmit: async () => {
      const { message } = values;
      if (message) {
        append({ content: message, role: "user" });
        resetForm();
      }
    },
  });
  const { values, handleSubmit, getFieldProps, resetForm } = formik;

  //check for credits, will be triggred when user send messages, more controlled way.
  useEffect(() => {
    dispatch(fetchCredits());
  }, [dispatch, messages]);

  const renderChatBoxes = (): ReactNode => {
    return messages?.map((item) => {
      return (
        <Grid
          key={item?.id}
          container
          justifyContent={item?.role === "user" ? "flex-end" : "flex-start"}
        >
          <Grid item>
            {item?.role === "user" ? (
              <Stack direction="column">
                <Typography
                  variant="caption"
                  color="text.secondary"
                >{`${getDateFormat()}`}</Typography>
                <Paper elevation={0} sx={userBox}>
                  <Typography variant="subtitle2">{item?.content}</Typography>
                </Paper>
              </Stack>
            ) : (
              <Stack direction="row" spacing={1}>
                <Avatar src="/mb.png">
                  <Typography variant="subtitle2">{`CA`}</Typography>
                </Avatar>
                <Stack direction="column" spacing={1}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                  >{`Assistant, ${getDateFormat()}`}</Typography>
                  <Paper elevation={0} sx={botBox}>
                    <Typography variant="subtitle2">{item?.content}</Typography>
                  </Paper>
                </Stack>
              </Stack>
            )}
          </Grid>
        </Grid>
      );
    });
  };

  return (
    <>
      <CardContent>
        {isConnected ? (
          <Box height="73vh" p={2} overflow="auto" sx={scrollbar}>
            <Stack direction="column" spacing={2}>
              {renderChatBoxes()}
            </Stack>
          </Box>
        ) : (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="73vh"
          >
            <Alert severity="warning">{ALERT_WARNING}</Alert>
          </Box>
        )}
      </CardContent>
      <Divider sx={{ borderStyle: "dashed" }} />
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <CardActions disableSpacing sx={{ px: 4 }}>
            <InputBase
              {...getFieldProps("message")}
              disabled={!isConnected}
              fullWidth
              size="medium"
              sx={{ ml: 1 }}
              placeholder="Type a message"
            />
            <IconButton color="secondary" type="submit">
              <Send />
            </IconButton>
          </CardActions>
        </Form>
      </FormikProvider>
    </>
  );
};
export default Messages;
