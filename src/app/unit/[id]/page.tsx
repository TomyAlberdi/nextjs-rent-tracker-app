"use client";

import LoadingMainData from "@/components/loadingMainData";
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
    return <LoadingMainData />;
  }

  return <div>{Unit?.name}</div>;
};

export default UnitPage;
