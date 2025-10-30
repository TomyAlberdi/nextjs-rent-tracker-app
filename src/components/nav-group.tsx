"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useGroupContext } from "@/context/group/useGroupContext";
import { Group } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

export function NavGroup() {
  const { getGroups } = useGroupContext();

  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getGroups().then((data) => {
      setGroups(data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel>Grupos</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))
          : groups.map((group, index) => (
              <Collapsible
                key={group.id}
                asChild
                defaultOpen={index === 0 ? true : false}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={group.name} className="rounded-xs h-9">
                    <Link href={`/group/${group.id}`}>
                      <span>{group.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  {group.properties?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90 rounded-xs">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub className="gap-0">
                          {group.properties?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.name} className="h-9">
                              <SidebarMenuSubButton asChild className="rounded-xs h-full">
                                <Link href={`/property/${subItem.id}`}>
                                  <span>{subItem.name}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
