"use client";
import ObjectGraph from "@/components/objectGraph";
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
    </div>
  );
}
