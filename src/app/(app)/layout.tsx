import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppSidebar } from "@/components/app-sidebar";
import React from "react";
import Header from "@/components/ui/header";

async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="h-full">
          <ScrollArea className="h-full w-full">{children}</ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default ProtectedLayout;
