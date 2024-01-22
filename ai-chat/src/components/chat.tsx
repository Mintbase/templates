import { Card, Divider } from "@mui/material";
import ChatHeader from "./chatHeader";
import Messages from "./messages";

const Chat: React.FC = () => {
  return (
    <Card raised sx={{ borderRadius: "20px" }}>
      <ChatHeader />
      <Divider sx={{ borderStyle: "dashed" }} />
      <Messages />
    </Card>
  );
};
export default Chat;
