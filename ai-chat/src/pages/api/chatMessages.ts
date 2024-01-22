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
