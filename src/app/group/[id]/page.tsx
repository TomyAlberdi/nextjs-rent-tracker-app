"use client";
import { Skeleton } from "@/components/ui/skeleton";
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

  return (
    <div>
      {Group?.name}
    </div>
  )
}

export default GroupPage;