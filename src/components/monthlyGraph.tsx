import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useRecordContext } from "@/context/record/useRecordContext";
import { MonthlySummaryRecordDTO } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

interface monthlyGraphProps {
  year: number;
}

const chartConfig = {
  totalIncome: {
    label: "Ingresos",
    color: "#00bc7d",
  },
  totalExpense: {
    label: "Gastos",
    color: "#ff2056",
  },
} satisfies ChartConfig;

const MonthlyGraph = ({ year }: monthlyGraphProps) => {
  const { getMonthlySummary } = useRecordContext();

  const [MonthlySummaryData, setMonthlySummaryData] = useState<
    MonthlySummaryRecordDTO[]
  >([]);
  const [Loading, setLoading] = useState(false);

  const fillMonthlySummaryData = useCallback(
    (data: MonthlySummaryRecordDTO[]) => {
      return data.map((record) => {
        return {
          ...record,
          monthName: getMonthName(record.month),
        };
      });
    },
    []
  );

  useEffect(() => {
    setLoading(true);
    const fetchMonthlySummary = async () => {
      const data = await getMonthlySummary(year);
      const filledData = fillMonthlySummaryData(data);
      setMonthlySummaryData(filledData);
    };
    fetchMonthlySummary().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  return (
    <Card className="w-full h-full rounded-md bg-popover">
      <CardHeader>
        <CardTitle className="text-2xl">
          Ingresos y Gastos Anuales Totales
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center h-full">
        {Loading ? (
          <Spinner className="size-20" />
        ) : (
          <ChartContainer config={chartConfig} className="h-[90%]">
            <AreaChart accessibilityLayer data={MonthlySummaryData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={"monthName"}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey={"totalIncome"}
                fill={"#00bc7d"}
                type="bump"
                fillOpacity={0.5}
                stroke="#00bc7d"
                dot={true}
              />
              <Area
                dataKey={"totalExpense"}
                fill={"#ff2056"}
                type="bump"
                fillOpacity={0.5}
                stroke="#ff2056"
                dot={true}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyGraph;
