"use client";
import MonthlyGraph from "@/components/monthlyGraph";
import ObjectGraph from "@/components/objectGraph";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [SelectedYear, setSelectedYear] = useState(2025);

  const handlePreviousYear = () => {
    setSelectedYear(SelectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(SelectedYear + 1);
  };

  return (
    <div className="h-full flex items-center justify-center gap-4 p-4">
      <section className="h-full w-1/3 flex flex-col gap-4">
        <ObjectGraph year={SelectedYear} type={"INDIVIDUAL"} />
        <ObjectGraph year={SelectedYear} type={"GROUPED"} />
      </section>
      <section className="h-full w-2/3 flex flex-col items-start gap-4">
        <div className="h-1/3 w-full flex gap-4">
          <Card className="w-1/3 flex flex-row justify-between items-center rounded-md bg-popover px-4 py-4">
            <Button className="h-full" onClick={handlePreviousYear}>
              <ChevronsLeft />
            </Button>
            <div className="h-full flex flex-col items-center justify-center gap-1">
              <span>Año Seleccionado</span>
              <span className="text-4xl font-bold">{SelectedYear}</span>
            </div>
            <Button onClick={handleNextYear} className="h-full">
              <ChevronsRight />
            </Button>
          </Card>
          <Card className="w-2/3 flex flex-col items-center justify-center rounded-md bg-popover">
            <span className="text-3xl font-bold">
              Panel de Información Anualizada
            </span>
          </Card>
        </div>
        <MonthlyGraph year={SelectedYear} />
      </section>
    </div>
  );
}
