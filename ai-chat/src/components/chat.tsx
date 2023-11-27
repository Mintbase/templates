"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "./ui/button";
import { useMbWallet } from "@mintbase-js/react";
import { ConnectWallet } from "./connect-wallet";

const Chat = () => {
  const { activeAccountId, isConnected } = useMbWallet();

  const { append, messages, isLoading } = useChat({
    api: "/api/chat-completion",
  });

  const sendMessage = (message: string) => {
    append({ role: "user", content: message });
  };

  return (
    <div className="h-screen relative">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full h-full overflow-y-auto border pb-[60px]">
          <div className="flex flex-col gap-2 p-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className="bg-white shadow overflow-hidden rounded-md p-3"
              >
                <div className="text-sm font-medium text-gray-900">
                  {message.role === "user" ? activeAccountId : message.role}
                </div>
                <div className="text-sm text-gray-500">{message.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <InputForm sendMessage={sendMessage} disabled={isLoading}></InputForm>
      </div>
    </div>
  );
};

const FormSchema = z.object({
  message: z.string(),
});

export const InputForm = ({
  sendMessage,
  disabled,
}: {
  sendMessage: (message: string) => void;
  disabled: boolean;
}) => {
  const { activeAccountId, isConnected } = useMbWallet();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data || !data.message || !isConnected) return;
    sendMessage(data.message);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2 w-screen p-2 bg-muted/50 bg-white">
                <FormControl>
                  <Input
                    placeholder="Your message here..."
                    {...field}
                    autoComplete={"off"}
                    disabled={!isConnected || disabled}
                  />
                </FormControl>
                <Button type="submit" disabled={!isConnected || disabled}>
                  Send
                </Button>
                <ConnectWallet />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default Chat;
