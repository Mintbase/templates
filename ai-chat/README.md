# AI Chat

AI-Chat is a Next.js project that provides a chat interface with AI capabilities. It uses the Mintbase Wallet for user authentication and the OpenAI GPT-4 model for generating chat responses.

<img src="https://i.imgur.com/JVWw82o.jpg" alt="cover_image"/>

## Description
AI-Chat is a Next.js project that provides a chat interface with AI capabilities. It uses the Mintbase Wallet for user authentication and the OpenAI GPT-4 model for generating chat responses.
[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)]([https://token-drop-template.mintbase.xyz/](https://ai-chat.mintbase.xyz))
[![Deploy](https://img.shields.io/badge/Deploy-Deploy%20Now-blue)](https://ai-chat.mintbase.xyz/)

**Tooling:**

[![Use Case](https://img.shields.io/badge/Use%20Case-Token%20Drops-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-Mb--js%3A%20SDK%2C%20Mb--js%3A%20Arweave%2C%20Mintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-NextJS%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/Surge_Code?style=social&logo=twitter)](https://twitter.com/Surge_Code)[![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)



## Project Walkthrough

<img src="https://i.imgur.com/PnXxMd1.jpg" alt="detail_image" width="500"/>


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

⚠️ Beta: We are still working on a solution to issue Mintbase API keys for using the Mintbase AI Router.

Checkout `.env.example` and create a local env file (`.env.local`) with:

```
MB_API_KEY=
```

## Code Examples

### Chat Component

The main chat component is located in `/src/components/chat.tsx`. It uses the `useChat` hook from the Vercel `ai` package to manage the chat state. Messages are sent to the server using the append function:

```ts
const { append, messages, isLoading } = useChat({
  api: "/api/chat-completion",
})

const sendMessage = (message: string) => {
  append({ role: "user", content: message })
}
```

### API Route

The API route for chat completion is defined in `/src/app/api/chat-completion/route.ts`. It sends a `POST` request to the Mintbase API with the chat messages:

```ts
export async function POST(req: Request) {
  const body = await req.json()
  const { messages } = body

  const response = await fetch(
    "https://mintbase-wallet-git-ai-relayer-credits-mintbase.vercel.app/api/ai/v1/router/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MB_API_KEY}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4-1106-preview",
        messages: messages,
      }),
    }
  )

  return new StreamingTextResponse(response.body!)
```

### Wallet Connection

The application uses the Mintbase Wallet for user authentication. The `ConnectWallet` component in `/src/components/connect-wallet.tsx`` provides a button for connecting and disconnecting the wallet:

```ts
export function ConnectWallet() {
  const { connect, disconnect, isConnected } = useMbWallet()

  return (
    <>
      <Button
        className="w-[100px] hidden md:flex"
        onClick={() => {
          if (isConnected) {
            disconnect()
          } else {
            connect()
          }
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
      <Button
        size="sm"
        className="w-[100px] md:hidden"
        onClick={() => {
          if (isConnected) {
            disconnect()
          } else {
            connect()
          }
        }}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </>
  );
}
```

## Get in touch

- Support: [Join the Telegram](https://tg.me/mintdev)
- Twitter: [@mintbase](https://twitter.com/mintbase)
