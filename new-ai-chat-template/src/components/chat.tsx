import { Container, Divider, useMediaQuery } from "@mui/material";
import ChatHeader from "./chatHeader";
import Messages from "./messages";

const Chat: React.FC = () => {
  const lg = useMediaQuery("(max-width:900px)");
  return (
    <>
      <ChatHeader />
      <Divider sx={{ mt: 1 }} />
      <Container maxWidth="md" sx={{ mt: 1 }}>
        <Messages />
      </Container>
    </>
  );
};
export default Chat;
