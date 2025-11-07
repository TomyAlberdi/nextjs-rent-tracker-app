"use client";
import MonthlyGraph from "@/components/monthlyGraph";
import ObjectGraph from "@/components/objectGraph";
import { Card } from "@/components/ui/card";
import {
  WheelPicker,
  WheelPickerOption,
  WheelPickerWrapper,
} from "@/components/wheel-picker";
import { useState } from "react";

const wheelOptions: WheelPickerOption[] = [
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
  { value: "2027", label: "2027" },
  { value: "2028", label: "2028" },
  { value: "2029", label: "2029" },
  { value: "2030", label: "2030" },
];

export default function Page() {
  const [SelectedYear, setSelectedYear] = useState("2025");

  return (
    <div className="h-full flex items-center justify-center gap-4 p-4">
      <section className="h-full w-1/3 flex flex-col gap-4">
        <ObjectGraph year={+SelectedYear} type={"INDIVIDUAL"} />
        <ObjectGraph year={+SelectedYear} type={"GROUPED"} />
      </section>
      <section className="h-full w-2/3 flex flex-col items-start gap-4">
        <div className="h-1/3 w-full flex gap-4">
          <Card className="w-1/3 flex flex-row justify-between items-center rounded-md bg-popover px-4 py-4">
            <WheelPickerWrapper>
              <WheelPicker
                options={wheelOptions}
                value={SelectedYear}
                onValueChange={setSelectedYear}
              />
            </WheelPickerWrapper>
          </Card>
          <Card className="w-2/3 flex flex-col items-center justify-center rounded-md bg-popover">
            <span className="text-3xl font-bold">
              Panel de Información Anualizada
            </span>
          </Card>
        </div>
        <MonthlyGraph year={+SelectedYear} />
      </section>
    </div>
  );
}
