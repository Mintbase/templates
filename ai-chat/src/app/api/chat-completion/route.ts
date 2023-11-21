import { StreamingTextResponse } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const body = await req.json();
  const { messages } = body;

  const response = await fetch("http://wallet.mintbase.xyz/api/ai/v1/router/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer <TOKEN>`,
    },
    body: JSON.stringify({
      model: "openai/gpt-4-1106-preview",
      messages: messages,
    }),
  });


  return new StreamingTextResponse(response.body!);
}
