"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useUnitContext } from "@/context/unit/useUnitContext";
import { Unit } from "@/lib/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UnitPage = () => {
  const { getUnitById } = useUnitContext();
  const { id } = useParams();
  const router = useRouter();
  const [Unit, setUnit] = useState<Unit | null>(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchUnit() {
      setLoading(true);
      const data = await getUnitById(id as string);
      if (!data) {
        router.push("/notFound");
      }
      setUnit(data);
      setLoading(false);
    }
    fetchUnit();
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

  return <div>{Unit?.name}</div>;
};

export default UnitPage;
