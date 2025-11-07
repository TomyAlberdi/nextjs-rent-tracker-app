"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUnitContext } from "@/context/unit/useUnitContext";
import { Unit } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavUnitProps {
  ReloadUnits: boolean;
}

export function NavUnit({ ReloadUnits }: NavUnitProps) {
  const { getUnits } = useUnitContext();

  const [properties, setProperties] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUnits().then((data) => {
      setProperties(data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ReloadUnits]);

  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel>Unidades</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="rounded-xs h-9" />
              ))
          : properties.map((Unit) => (
              <SidebarMenuItem key={Unit.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={Unit.name}
                  className="rounded-xs h-9"
                >
                  <Link href={`/unit/${Unit.id}`}>
                    <span>{Unit.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
