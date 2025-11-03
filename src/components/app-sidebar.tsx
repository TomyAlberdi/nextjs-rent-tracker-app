"use client";

import { CircleDollarSign } from "lucide-react";
import * as React from "react";

import CreateGroup from "@/components/createGroup";
import CreateUnit from "@/components/createUnit";
import { NavFooter } from "@/components/nav-footer";
import { NavGroup } from "@/components/nav-group";
import { NavUnit } from "@/components/nav-unit";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [ReloadUnits, setReloadUnits] = useState(false);
  const [ReloadGroups, setReloadGroups] = useState(false);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="rounded-xs">
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-xs">
                  <CircleDollarSign className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Administración</span>
                  <span className="truncate text-xs">Gastos e Ingresos</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavGroup ReloadGroups={ReloadGroups} ReloadUnits={ReloadUnits} />
        <NavUnit ReloadUnits={ReloadUnits} />
      </SidebarContent>
      <SidebarFooter>
        <CreateGroup
          ReloadGroups={ReloadGroups}
          setReloadGroups={setReloadGroups}
        />
        <CreateUnit
          ReloadUnits={ReloadUnits}
          setReloadUnits={setReloadUnits}
          ReloadGroups={ReloadGroups}
        />
        <NavFooter />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
