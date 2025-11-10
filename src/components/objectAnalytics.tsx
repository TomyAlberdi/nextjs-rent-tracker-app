import ObjectAnalyticsExpenseRatioCard from "@/components/objectAnalyticsExpenseRatioCard";
import ObjectAnalyticsTrendCard from "@/components/objectAnalyticsTrendCard";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useRecordContext } from "@/context/record/useRecordContext";
import { Group, Unit, UnitType } from "@/lib/interfaces";
import { getExpenseRatio, getMonthlyTrend, getMonthName } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ObjectAnalyticsProps {
  object: Unit | Group;
  parentType: UnitType;
}

const ObjectAnalytics = ({ object, parentType }: ObjectAnalyticsProps) => {
  const { getRecords } = useRecordContext();
  const [MonthlyTrend, setMonthlyTrend] = useState<number | null>(null);
  const [ExpenseRatio, setExpenseRatio] = useState<number | null>(null);
  const [LastMonth, setLastMonth] = useState<string | null>(null);
  const [LastTwoMonths, setLastTwoMonths] = useState<string | null>(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchRecords = async () => {
      const data = await getRecords(parentType, object.id, 2025);
      if (data.length < 2) {
        return;
      }
      const trend = getMonthlyTrend(data);
      setMonthlyTrend(trend);
      const ratio = getExpenseRatio(data);
      setExpenseRatio(ratio);
      const lastMonth = getMonthName(data[data.length - 1].month) || null;
      setLastMonth(lastMonth);
      const secondLastMonth = getMonthName(data[data.length - 2].month) || null;
      setLastTwoMonths(`${secondLastMonth} - ${lastMonth}`);
    };
    fetchRecords().then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [object.id]);

  return (
    <CardContent className="flex flex-col gap-2 border-b pt-2 pb-4">
      <CardTitle className="text-2xl">Análisis</CardTitle>
      {Loading ? (
        <Card className="flex justify-start items-center bg-background rounded-md px-4 py-2 gap-1">
          <Spinner className="size-6" />
        </Card>
      ) : (
        <>
          <ObjectAnalyticsTrendCard
            trend={MonthlyTrend}
            lastTwoMonths={LastTwoMonths}
          />
          <ObjectAnalyticsExpenseRatioCard
            ratio={ExpenseRatio}
            lastMonth={LastMonth}
          />
        </>
      )}
    </CardContent>
  );
};

export default ObjectAnalytics;
