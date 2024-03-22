import { StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  const response = await fetch(
    "https://mintbase-wallet-git-ai-relayer-credits-mintbase.vercel.app/api/ai/v1/router/chat",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MB_API_KEY || 'hey'}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4-1106-preview",
        messages: messages,
      }),
    }
  );

  return new StreamingTextResponse(response.body!);
}
