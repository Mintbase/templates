import { useMbWallet } from "@mintbase-js/react";
import { Box, Paper, Stack, Card } from "@mui/material";
import { Form, FormikProvider, useFormik } from "formik";
import { useChat } from "ai/react";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { fetchCredits } from "@/store/features/chat/thunks/chatThunk";
import { scrollbar } from "@/utils/chatBoxStyle";
import OpeningBox from "./openingBox";
import ChatActions from "./chatActions";
import ChatResponses from "./chatResponses";

const Messages: React.FC = () => {
  const { isConnected } = useMbWallet();
  const dispatch = useAppDispatch();

  const { append, messages, isLoading, stop, reload } = useChat({
    api: "/api/messages/route",
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
    return messages?.map((item, index) => {
      return (
        <ChatResponses
          key={item?.id}
          item={item}
          index={index}
          reload={reload}
          messages={messages}
        />
      );
    });
  };

  return (
    <>
      <Paper sx={scrollbar} elevation={0}>
        <Box p={1}>
          {messages.length ? (
            <Stack direction="column" spacing={2}>
              {renderChatBoxes()}
            </Stack>
          ) : (
            <OpeningBox />
          )}
        </Box>
      </Paper>
      <Card
        variant="elevation"
        elevation={15}
        sx={{ borderRadius: "20px", mt: 1 }}
      >
        <FormikProvider value={formik}>
          <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <ChatActions
              isLoading={isLoading}
              isConnected={isConnected}
              stop={stop}
              getFieldProps={getFieldProps}
            />
          </Form>
        </FormikProvider>
      </Card>
    </>
  );
};
export default Messages;
