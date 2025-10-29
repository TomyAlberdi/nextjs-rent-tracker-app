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
import { useGroupContext } from "@/context/group/useGroupContext";
import { Group } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

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
    <SidebarGroup>
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
                  <SidebarMenuButton asChild tooltip={group.name}>
                    <Link href={`/group/${group.id}`}>
                      <span>{group.name}</span>
                    </Link>
                  </SidebarMenuButton>
                  {group.properties?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {group.properties?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.name}>
                              <SidebarMenuSubButton asChild>
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
