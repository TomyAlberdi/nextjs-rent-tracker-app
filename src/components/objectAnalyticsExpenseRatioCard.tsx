import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { BanknoteArrowDown } from "lucide-react";

interface ObjectAnalyticsCardProps {
  ratio: number | null;
  lastMonth: string | null;
}

const ObjectAnalyticsExpenseRatioCard = ({
  ratio,
  lastMonth,
}: ObjectAnalyticsCardProps) => {
  if (ratio === null)
    return (
      <Card className="flex flex-row justify-start items-center bg-background rounded-md px-2 py-2 gap-2">
        <CardTitle>
          No hay datos suficientes para realizar el análisis de la tasa de
          gastos.
        </CardTitle>
        <CardDescription>{lastMonth}</CardDescription>
      </Card>
    );

  return (
    <Card className="flex flex-row justify-start items-center bg-background rounded-md px-2 py-2 gap-2">
      <div className="w-full">
        <CardTitle>Tasa de gastos de % {ratio}</CardTitle>
        <CardDescription>{lastMonth}</CardDescription>
      </div>
      <div className="h-10 aspect-square border flex justify-center items-center rounded-xs bg-sidebar-primary">
        <BanknoteArrowDown color="black" />
      </div>
    </Card>
  );
};

export default ObjectAnalyticsExpenseRatioCard;
