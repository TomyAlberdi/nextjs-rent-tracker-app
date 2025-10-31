"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyContext } from "@/context/property/usePropertyContext";
import { Property } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

interface NavUnitProps {
  ReloadUnits: boolean;
}

export function NavUnit({ ReloadUnits }: NavUnitProps) {
  const { getProperties } = usePropertyContext();

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProperties().then((data) => {
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
                <Skeleton key={index} className="h-4 w-full" />
              ))
          : properties.map((property) => (
              <SidebarMenuItem key={property.id}>
                <SidebarMenuButton
                  asChild
                  tooltip={property.name}
                  className="rounded-xs h-9"
                >
                  <Link href={`/unit/${property.id}`}>
                    <span>{property.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
