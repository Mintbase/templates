# AI Chat
<img src="https://i.imgur.com/uIIL4tt.png" alt="cover_image" width="0"/>

Turn Your AI Passion into NFT Profits: A Blueprint for Aspiring Digital Moguls! Customize this AI Chat example to capture value for your next AI product.

[![Demo](https://img.shields.io/badge/Demo-Visit%20Demo-brightgreen)](https://ai-chat.mintbase.xyz)
[![Deploy](https://img.shields.io/badge/Deploy-on%Vercel-blue)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMintbase%2Ftemplates%2Ftree%2Fmain%2Fai-chat)

**Tooling:**

AI-Chat is a Next.js project that provides a chat interface with AI capabilities. It uses the Mintbase Wallet for user authentication and the OpenAI GPT-4 model for generating chat responses.

[![Use Case](https://img.shields.io/badge/Use%20Case-AI-blue)](#)
[![Tools](https://img.shields.io/badge/Tools-@mintbase.js/sdk%2C@mintbase.js/rpc%2C@mintbase.js/react%2C@mintbase.js/data%2CArweave%2CMintbase%20Wallet-blue)](#)
[![Framework](https://img.shields.io/badge/Framework-Next.js%2014-blue)](#)

**Author:**

[![Author](https://img.shields.io/twitter/follow/microchipgnu?style=social&logo=twitter)](https://twitter.com/microchipgnu) [![Organization](https://img.shields.io/badge/Mintbase-blue)](https://www.mintbase.xyz)



## Project Walkthrough

*NOTE: As a standard on Mintbase as we use the latest versions of Next.js we recommend using pnpm, but the package manager is up to your personal choice.*

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


<img src="https://i.imgur.com/3aH1Lur.png" alt="detail_image" width="500"/>
