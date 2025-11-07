import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useRecordContext } from "@/context/record/useRecordContext";
import { Group, Record, Unit, UnitType } from "@/lib/interfaces";
import { getMonthlyTrend } from "@/lib/utils";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ObjectAnalyticsProps {
  object: Unit | Group;
  parentType: UnitType;
}

const ObjectAnalytics = ({ object, parentType }: ObjectAnalyticsProps) => {
  const { getRecords } = useRecordContext();
  const [Records, setRecords] = useState<Record[]>([]);
  const [MonthlyTrend, setMonthlyTrend] = useState(0);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRecords = async () => {
      const data = await getRecords(parentType, object.id, 2025);
      setRecords(data);
    };
    fetchRecords().then(() => {
      const trend = getMonthlyTrend(Records);
      setMonthlyTrend(trend);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [object.id]);

  return (
    <CardContent className="flex flex-col gap-2 border-b pt-2 pb-4">
      <span className="text-xl">Análisis</span>
      <Card className="flex justify-start items-center bg-background rounded-md">
        {Loading ? (
          <Spinner className="size-6" />
        ) : (
          <CardTitle className="flex">
            {/* TODO: Finish object analytics */}
            {MonthlyTrend > 0
              ? `Tendencia al alza en ${MonthlyTrend}% este mes ${(
                  <TrendingUp />
                )}`
              : MonthlyTrend < 0
              ? `Tendencia a la baja en ${MonthlyTrend}% este mes ${(
                  <TrendingDown />
                )}`
              : `Tendencia estable este mes ${(<MoveRight />)}`}
          </CardTitle>
        )}
      </Card>
    </CardContent>
  );
};

export default ObjectAnalytics;
