import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Spinner } from "@/components/ui/spinner";
import { useRecordContext } from "@/context/record/useRecordContext";
import { ParentSummaryRecordDTO, UnitType } from "@/lib/interfaces";
import { getFillColor } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Pie, PieChart } from "recharts";

interface ObjectGraphProps {
  type: UnitType;
  year: number;
}

interface ChartConfigType {
  [key: string]: {
    label: string;
    color: string;
  };
}

const ObjectGraph = ({ type, year }: ObjectGraphProps) => {
  const { getParentSummary } = useRecordContext();
  const router = useRouter();

  const [ParentData, setParentData] = useState<ParentSummaryRecordDTO[]>([]);
  const [Loading, setLoading] = useState(false);

  const fillParentData = useCallback((data: ParentSummaryRecordDTO[]) => {
    return data.map((record, index) => {
      return {
        ...record,
        fill: getFillColor(index),
      };
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchParentSummary = async () => {
      const data = await getParentSummary(year, type);
      const filledData = fillParentData(data);
      setParentData(filledData);
    };
    fetchParentSummary().then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, type]);

  const [ChartConfig, setChartConfig] = useState<ChartConfigType>({});
  useEffect(() => {
    const newConfig: ChartConfigType = {};
    ParentData.forEach((record) => {
      newConfig[record.parentName] = {
        label: record.parentName,
        color: record.fill || "var(--chart-1)",
      };
    });
    setChartConfig(newConfig);
    console.log(newConfig);
  }, [ParentData]);

  const handlePieClick = useCallback(
    (
      payloadOrWrapper:
        | ParentSummaryRecordDTO
        | { payload?: ParentSummaryRecordDTO }
    ) => {
      const isWrapper = (
        p: unknown
      ): p is { payload?: ParentSummaryRecordDTO } =>
        typeof p === "object" && p !== null && "payload" in (p as object);

      const record = isWrapper(payloadOrWrapper)
        ? payloadOrWrapper.payload
        : (payloadOrWrapper as ParentSummaryRecordDTO);

      const parentId = record?.parentId;
      if (!parentId) return;
      const route =
        type === "INDIVIDUAL" ? `/unit/${parentId}` : `/group/${parentId}`;
      router.push(route);
    },
    [router, type]
  );

  return (
    <Card className="w-full h-1/2 rounded-md bg-popover">
      <CardHeader>
        <CardTitle className="text-xl">
          Ingresos Anuales Netos por{" "}
          {type === "INDIVIDUAL" ? "Unidad" : "Grupo"}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full flex justify-center items-center">
        {Loading ? (
          <Spinner className="size-20" />
        ) : (
          <ChartContainer config={ChartConfig} className="h-full">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={ParentData}
                dataKey="netIncome"
                nameKey="parentName"
                onClick={handlePieClick}
                className="cursor-pointer"
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default ObjectGraph;
