"use client";
import "@/app/globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import GroupContextComponent from "@/context/group/GroupContextComponent";
import PropertyContextComponent from "@/context/property/PropertyContextComponent";
import RecordContextComponent from "@/context/record/RecordContextComponent";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PropertyContextComponent>
          <GroupContextComponent>
            <RecordContextComponent>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                      <SidebarTrigger className="-ml-1" />
                      <Separator
                        orientation="vertical"
                        className="mr-2 data-[orientation=vertical]:h-4"
                      />
                      {/* 
                  //TODO: build nextjs breadcrumb
                */}
                    </div>
                  </header>
                  {children}
                </SidebarInset>
              </SidebarProvider>
              <Toaster />
            </RecordContextComponent>
          </GroupContextComponent>
        </PropertyContextComponent>
      </body>
    </html>
  );
}
