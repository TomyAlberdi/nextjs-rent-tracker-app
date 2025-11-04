"use client";
import "@/app/globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar";
import GroupContextComponent from "@/context/group/GroupContextComponent";
import RecordContextComponent from "@/context/record/RecordContextComponent";
import UnitContextComponent from "@/context/unit/UnitContextComponent";
import { ThemeProvider } from "@/lib/theme-provider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UnitContextComponent>
            <GroupContextComponent>
              <RecordContextComponent>
                <SidebarProvider>
                  <AppSidebar />
                  <SidebarInset>
                    <div className="h-full w-full text-sidebar-primary">
                      {children}
                    </div>
                  </SidebarInset>
                </SidebarProvider>
                <Toaster />
              </RecordContextComponent>
            </GroupContextComponent>
          </UnitContextComponent>
        </ThemeProvider>
      </body>
    </html>
  );
}
