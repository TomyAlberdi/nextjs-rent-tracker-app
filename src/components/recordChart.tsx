"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRecordContext } from "@/context/record/useRecordContext";
import { Record, Transaction, UnitType } from "@/lib/interfaces";
import { getMonthName } from "@/lib/utils";
import { LineChart } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const addIdToTransactions = (transactions: Transaction[]) => {
  return transactions.map((transaction) => ({
    ...transaction,
    temporalId: crypto.randomUUID(),
  }));
};

interface RecordChartProps {
  year: number;
  parentName: string;
  parentId: string;
  parentType: UnitType;
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

const RecordChart = ({
  year,
  parentId,
  parentName,
  parentType,
}: RecordChartProps) => {
  const { getRecords } = useRecordContext();
  const [DialogOpen, setDialogOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [Records, setRecords] = useState<Record[]>([]);
  const [SelectedRecord, setSelectedRecord] = useState<Record | null>(null);

  const fillRecords = useCallback(
    (records: Record[]) => {
      const filledRecords = Array.from({ length: 12 }, (_, i) => {
        const month = i + 1;
        const found = records.find((r) => r.month === month);
        if (found) {
          return {
            ...found,
            parentName: parentName,
            monthName: getMonthName(month),
            transactions: addIdToTransactions(found.transactions),
          };
        }
        const fillerRecord: Record = {
          id: null,
          type: parentType,
          parentId: parentId,
          parentName: parentName,
          month,
          year,
          totalIncome: 0,
          totalExpense: 0,
          netIncome: 0,
          monthName: getMonthName(month),
          transactions: [],
        };
        fillerRecord.transactions = addIdToTransactions(
          fillerRecord.transactions
        );
        return fillerRecord;
      });
      return filledRecords.sort((a, b) => a.month - b.month);
    },
    [parentId, parentName, parentType, year]
  );

  useEffect(() => {
    const fetchPropertyRecords = async () => {
      if (!parentId || !year) return;
      const records = await getRecords(parentType, parentId, year);
      const filledRecords = fillRecords(records);
      setRecords(filledRecords);
    };
    fetchPropertyRecords();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentId, year]);

  useEffect(() => {
    const selectedRecord = Records.find((r) => r.month === selectedMonth);
    setSelectedRecord(selectedRecord || null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth]);

  interface BarClickData {
    activeLabel?: string;
  }

  const handleBarClick = (data: BarClickData) => {
    if (data && data.activeLabel) {
      const record = Records.find((r) => r.monthName === data.activeLabel);
      if (record) {
        setSelectedMonth(record.month);
        setDialogOpen(true);
      }
    }
  };

  return (
    <>
      <Card className="rounded-md bg-inherit h-full border-none pb-2">
        <CardHeader className="flex items-center">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-xs">
            <LineChart />
          </div>
          <span>
            <CardTitle>{parentName}</CardTitle>
            <CardDescription>{year}</CardDescription>
          </span>
        </CardHeader>
        <CardContent className="h-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <AreaChart
              accessibilityLayer
              data={Records}
              onClick={handleBarClick}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey={"monthName"}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickCount={10}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey={"totalIncome"}
                fill={"#00bc7d"}
                type="bump"
                className="cursor-pointer"
                fillOpacity={0.5}
                stroke="#00bc7d"
                dot={true}
              />
              <Area
                dataKey={"totalExpense"}
                fill={"#ff2056"}
                type="bump"
                className="cursor-pointer"
                fillOpacity={0.5}
                stroke="#ff2056"
                dot={true}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Dialog open={DialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent
          aria-describedby={undefined}
          className="flex flex-col justify-start items-center pb-4 max-h-[80vh] min-h-[300px] overflow-y-scroll custom-sidebar bg-popover text-sidebar-primary rounded-xs"
        >
          <DialogHeader className="w-full flex items-center">
            <DialogTitle className="alternate-font text-xl w-full text-center pt-4">
              Registro de ingresos para la unidad <br />
              <Button
                className="w-full mt-4 cursor-default"
                variant={"outline"}
              >
                {parentName}
              </Button>
            </DialogTitle>
          </DialogHeader>
          {
            //SelectedRecord && <AddRecord record={SelectedRecord} />
          }
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RecordChart;
