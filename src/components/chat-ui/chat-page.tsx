"use client";

import ChatInput from "@/components/chat-ui/chat-input";
import { getChat } from "@/lib/actions/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChat } from "ai/react";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { HeaderTitle } from "../header-title";
import ChatMessages from "./chat-messages";

const FormSchema = z.object({
  prompt: z.string(),
});

const ChatPage = () => {
  const params = useParams();
  const chatId = params.chatId as string;
  const [title, setTitle] = useState("");

  useEffect(() => {
    const loadChat = async () => {
      try {
        const chat = await getChat(chatId);
        setTitle(chat.title || `Chat ${chatId.slice(0, 8)}`);
      } catch (error) {
        console.error("Failed to load chat:", error);
      }
    };

    if (chatId) {
      loadChat();
    }
  }, [chatId]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { messages, setInput, handleSubmit, status } = useChat({
    id: chatId,
    body: { chatId },
    experimental_prepareRequestBody: ({ messages }) => {
      const last = messages[messages.length - 1];
      return { message: last };
    },
  });

  const watchedPrompt = form.watch("prompt");
  useEffect(() => {
    setInput(watchedPrompt);
  }, [watchedPrompt, setInput]);

  const memoMessages = useMemo(() => messages, [messages]);

  return (
    <main className="flex flex-col h-[calc(100dvh-4rem)]">
      <HeaderTitle breadcrumbs={[{ label: title }]} />

      <ChatMessages messages={memoMessages} status={status} />

      <ChatInput form={form} handleSubmit={handleSubmit} status={status} />
    </main>
  );
};

export default ChatPage;
