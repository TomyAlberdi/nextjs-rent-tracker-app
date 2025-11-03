"use client";
import LoadingMainData from "@/components/loadingMainData";
import { useGroupContext } from "@/context/group/useGroupContext";
import { Group } from "@/lib/interfaces";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GroupPage = () => {
  const { getGroupById } = useGroupContext();
  const { id } = useParams();
  const router = useRouter();
  const [Group, setGroup] = useState<Group | null>(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchGroup() {
      setLoading(true);
      const data = await getGroupById(id as string);
      if (!data) {
        router.push("/notFound");
      }
      setGroup(data);
      setLoading(false);
    }
    fetchGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (Loading) {
    return <LoadingMainData />;
  }

  return <div>{Group?.name}</div>;
};

export default GroupPage;
