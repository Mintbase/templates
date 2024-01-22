```
# AI-CHAT


## Description

AI-Chat is a Next.js project that provides a chat interface with AI capabilities. It uses the Mintbase Wallet for user authentication and the OpenAI GPT-4 model for generating chat responses.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://your-live-app/)

[![Deploy](https://img.shields.io/badge/Deploy-Deploy%20Now-blue)](https://your-link-to-deploy-on-vercel/)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-{Use%20Case%20One,%20Use%20Case%20Two}-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-Tool%20One,Tool%20Two-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-NextJS%2014-blue)](#)


## Project Walkthrough

To get started with the project, you need to install the dependencies first. Run the following command in your terminal:

```

pnpm install

```

After installing the dependencies, you can start the development server:

```

pnpm run dev

```

Then, open http://localhost:3000 with your browser to see the result.


### Environment Variables

Please create a file name `.env.local` with a variable `MB_API_KEY=`

```

## Code Examples

### Chat Component

The main chat component is located in `/src/components/messages.tsx`. It uses the `useChat` hook from the Vercel `ai` package to manage the chat state. Messages are sent to the server using the append function:

```ts
  const { append, messages } = useChat({
    api: "/api/chatMessages",
  });

  onSubmit: async () => {
      const { message } = values;
      if (message) {
        append({ content: message, role: "user" });
        resetForm();
      }
   },
```

Chat component also uses styles which are located in `src/utils/chatBoxStyle.ts`

Chat components also uses the formatted datetime string which is located in `src/utils/datetime.ts`

### API Route

The API route for chat completion is defined in `/src/app/api/chatMessages.ts`. It sends a `POST` request to the Mintbase API with the chat messages:

Values of `CHAT_HEADERS` and `MB_CHAT` are stored in a constant file `/src/constants/index.ts`

```ts
import { CHAT_HEADERS } from "@/store/requestDefaults/axiosDefaults";
import { MB_CHAT } from "@/store/requestDefaults/routes";
import { StreamingTextResponse } from "ai";

export const runtime = "edge";

export default async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  const response = await fetch(MB_CHAT, {
    method: "POST",
    headers: CHAT_HEADERS,
    body: JSON.stringify({
      model: "openai/gpt-4-1106-preview",
      messages: messages,
    }),
  });

  return new StreamingTextResponse(response.body!);
}
```

### Wallet Connection

The application uses the Mintbase Wallet for user authentication. The `ChatHeader` component in `/src/components/chatHeader.tsx`` provides a connect and disconnect button and also shows the available credits:

```ts
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
```
