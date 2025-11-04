"use client";
import LoadingMainData from "@/components/loadingMainData";
import ObjectInfo from "@/components/objectInfo";
import RecordChart from "@/components/recordChart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useGroupContext } from "@/context/group/useGroupContext";
import { Group } from "@/lib/interfaces";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GroupPage = () => {
  const { getGroupById } = useGroupContext();
  const { id } = useParams();
  const router = useRouter();
  const [Group, setGroup] = useState<Group | null>(null);
  const [Loading, setLoading] = useState(false);
  const [RecordDataYear, setRecordDataYear] = useState(2025);

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

  const handlePreviousYear = () => {
    setRecordDataYear(RecordDataYear - 1);
  };

  const handleNextYear = () => {
    setRecordDataYear(RecordDataYear + 1);
  };

  if (Loading) {
    return <LoadingMainData />;
  }

  return (
    <div className="h-full flex justify-start items-center">
      <div className="h-full w-3/4 flex flex-col gap-2 relative border-none">
        <RecordChart
          year={RecordDataYear}
          parentName={Group?.name || ""}
          parentId={Group?.id || ""}
          parentType={"GROUPED"}
        />
        <Card className="flex flex-row justify-between bg-popover p-2 rounded-xs self-center absolute top-5 right-5">
          <Button onClick={handlePreviousYear}>
            <ChevronsLeft />
          </Button>
          <span className="text-2xl font-bold">{RecordDataYear}</span>
          <Button onClick={handleNextYear}>
            <ChevronsRight />
          </Button>
        </Card>
      </div>
      {Group && <ObjectInfo object={Group} />}
    </div>
  );
};

export default GroupPage;
