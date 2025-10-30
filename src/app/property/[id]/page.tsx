"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { usePropertyContext } from "@/context/property/usePropertyContext";
import { Property } from "@/lib/interfaces";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";

type PropertyProps = {
  params: Promise<{ id: string }>;
};

const PropertyPage = ({ params }: PropertyProps) => {
  const { getPropertyById } = usePropertyContext();
  const { id } = use(params);

  const [Property, setProperty] = useState<Property | null>(null);
  const [Loading, setLoading] = useState(false);
  const [PropertyUpdated, setPropertyUpdated] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      setLoading(true);
      const data = await getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    loadProperty();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (Loading) {
    return (
      <div className="h-full flex justify-start items-center gap-4 p-4 pt-0">
        <div className="h-full w-1/4 flex flex-col gap-4">
          <Skeleton className="h-1/2 w-full" />
          <Skeleton className="h-1/2 w-full" />
        </div>
        <Skeleton className="h-full w-3/4" />
      </div>
    );
  }

  if (!Loading && !Property) return notFound();

  return <div>Property</div>;
};

export default PropertyPage;
