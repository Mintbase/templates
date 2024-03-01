"use client";
/* eslint-disable react/no-children-prop */

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
import Markdown from "react-markdown";
import { ConnectWallet } from "./connect-wallet";
import { SocialMedias } from "./social";

const Chat = () => {
  const { activeAccountId, isConnected, connect } = useMbWallet();

  const { append, messages, isLoading } = useChat({
    api: "/api/chat-completion",
  });

  const sendMessage = (message: string) => {
    append({ role: "user", content: message });
  };

  const defaultMessage = isConnected
    ? "please start typing something on the input below"
    : "please connect first to use the AI Chat.";

  return (
    <div className="h-screen relative chat">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full h-full overflow-y-auto chat-border pb-[60px]">
        <SocialMedias />

          <div className="flex flex-col gap-2 p-2  mt-[30px]">
            {messages.length > 0 ? (
              messages.map((message, index) => {
                return (
                  <div
                    key={index}
                    className="chat-card-bg chat-card chat-scale shadow overflow-hidden rounded-md p-3"
                  >
                    <div className="text-sm font-medium user-label">
                      {message.role === "user" ? activeAccountId : message.role}
                    </div>
                    <div className="text-sm text-white">
                      <Markdown children={message.content} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-white w-full default-message text-center justify-center">
                {" "}
                <div className="block text-center">
                  <div>{defaultMessage}</div>
                  {!isConnected && (
                    <Button
                      className="white-button"
                      onClick={() => {
                        connect();
                      }}
                    >
                      {" "}
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="chat-border-down absolute bottom-0 w-full">
        <InputForm sendMessage={sendMessage} disabled={isLoading}></InputForm>
      </div>
      <ConnectWallet />
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
  const { isConnected } = useMbWallet();

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
              <div className="flex gap-2 w-screen p-2 h-[82px] chat-card-bg ">
                <div className="chat-input flex">
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
                </div>
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
