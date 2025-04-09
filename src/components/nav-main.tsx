"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MessageSquarePlus } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useChats } from "@/hooks/use-chats";

export function NavMain() {
  const pathname = usePathname();
  const { data: chats = [] } = useChats();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            tooltip="New Chat"
            className="bg-blue-600 hover:bg-blue-700 text-neutral-50 hover:text-neutral-50"
          >
            <Link href="/chat" className="flex items-center gap-2">
              <MessageSquarePlus className="h-4 w-4" />
              <span>New Chat</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {chats.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton
              asChild
              className={cn(pathname === `/chat/${chat.id}` ? "font-bold" : "")}
            >
              <Link href={`/chat/${chat.id}`} className="flex items-center gap-2">
                <span className="truncate">
                  {chat.title || `Chat ${chat.id.slice(0, 8)}`}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
