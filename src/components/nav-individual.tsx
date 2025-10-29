"use client";


import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyContext } from "@/context/property/usePropertyContext";
import { Property } from "@/lib/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";

export function NavIndividual() {
  const { getProperties } = usePropertyContext();

  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProperties().then((data) => {
      setProperties(data);
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Individuales</SidebarGroupLabel>
      <SidebarMenu>
        {isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))
          : properties.map((property) => (
              <SidebarMenuItem key={property.id}>
                <SidebarMenuButton asChild tooltip={property.name}>
                  <Link href={`/property/${property.id}`}>
                    <span>{property.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
