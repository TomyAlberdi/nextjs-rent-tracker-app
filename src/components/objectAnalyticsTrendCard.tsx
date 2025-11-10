import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { MoveRight, TrendingDown, TrendingUp } from "lucide-react";

interface ObjectAnalyticsCardProps {
  trend: number | null;
  lastTwoMonths: string | null;
}

const ObjectAnalyticsTrendCard = ({
  trend,
  lastTwoMonths,
}: ObjectAnalyticsCardProps) => {
  if (trend === null)
    return (
      <Card className="flex flex-row justify-start items-center bg-background rounded-md px-2 py-2 gap-2">
        <CardTitle>
          No hay datos suficientes para realizar el análisis de tendencia.
        </CardTitle>
      </Card>
    );

  if (trend > 0)
    return (
      <Card className="flex flex-row justify-start items-center bg-background rounded-md px-2 py-2 gap-2">
        <div className="w-full">
          <CardTitle>Tendencia positiva de % {trend}</CardTitle>
          <CardDescription>{lastTwoMonths}</CardDescription>
        </div>
        <div className="h-10 aspect-square border flex justify-center items-center rounded-xs bg-sidebar-primary">
          <TrendingUp color="black" />
        </div>
      </Card>
    );

  if (trend < 0)
    return (
      <Card className="flex flex-row justify-start items-center bg-background rounded-md px-2 py-2 gap-2">
        <div className="w-full">
          <CardTitle>Tendencia negativa de % {trend * -1}</CardTitle>
          <CardDescription>{lastTwoMonths}</CardDescription>
        </div>
        <div className="h-10 aspect-square border flex justify-center items-center rounded-xs bg-sidebar-primary">
          <TrendingDown color="black" />
        </div>
      </Card>
    );

  return (
    <Card className="flex flex-row justify-start items-center bg-background rounded-md px-2 py-2 gap-2">
      <div className="w-full">
        <CardTitle>Tendencia estable</CardTitle>
        <CardDescription>{lastTwoMonths}</CardDescription>
      </div>
      <div className="h-10 aspect-square border flex justify-center items-center rounded-xs bg-sidebar-primary">
        <MoveRight color="black" />
      </div>
    </Card>
  );
};

export default ObjectAnalyticsTrendCard;
