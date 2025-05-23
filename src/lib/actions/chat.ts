'use server';

import { chat, message } from '@/server/db/schema';
import { auth } from '@/server/auth/index';
import { Message as AIMessage } from 'ai';
import { headers } from 'next/headers';
import { db } from '@/server/db';
import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export type Chat = typeof chat.$inferSelect;
export type Message = typeof message.$inferSelect;

export async function createChat({
  userMessage,
  title,
}: {
  userMessage: AIMessage;
  title: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const chatId = nanoid();

  await db.insert(chat).values({
    id: chatId,
    userId: session.user.id,
    title,
  });

  await db.insert(message).values({
    id: nanoid(),
    chatId,
    content: userMessage.content,
    role: 'user',
  });

  return { chatId };
}

export async function getChat(chatId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const result = await db.query.chat.findFirst({
    where: (chat, { and, eq }) => and(eq(chat.id, chatId), eq(chat.deleted, false)),
  });

  if (!result) {
    throw new Error('Chat not found');
  }

  if (result.userId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  return result;
}

export async function getChatMessages(chatId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const chatResult = await db.query.chat.findFirst({
    where: eq(chat.id, chatId),
    columns: {
      userId: true,
    },
  });

  if (!chatResult) {
    throw new Error('Chat not found');
  }

  if (chatResult.userId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  const messages = await db.query.message.findMany({
    where: eq(message.chatId, chatId),
    orderBy: (messages, { asc }) => [asc(messages.createdAt)],
  });

  return messages;
}

export async function deleteChat(chatId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const chatResult = await db.query.chat.findFirst({
    where: eq(chat.id, chatId),
  });

  if (!chatResult) {
    throw new Error('Chat not found');
  }

  if (chatResult.userId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  await db.update(chat).set({ deleted: true }).where(eq(chat.id, chatId));

  return { success: true };
}

export async function getUserChats() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const chats = await db.query.chat.findMany({
    where: (chat, { and, eq, isNull }: { and: any; eq: any; isNull: any }) =>
      and(eq(chat.userId, session.user.id), eq(chat.deleted, false)),
    orderBy: (chat: any, { desc }: { desc: any }) => [desc(chat.createdAt)],
  });

  return chats;
}

export async function saveMessage(chatId: string, content: string, role: 'user' | 'assistant') {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    throw new Error('Not authenticated');
  }

  const chatResult = await db.query.chat.findFirst({
    where: eq(chat.id, chatId),
    columns: {
      userId: true,
    },
  });

  if (!chatResult) {
    throw new Error('Chat not found');
  }

  if (chatResult.userId !== session.user.id) {
    throw new Error('Unauthorized');
  }

  const newMessage = await db.insert(message).values({
    id: nanoid(),
    chatId,
    content,
    role,
  });

  return newMessage;
}
