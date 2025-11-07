import { Record } from "@/lib/interfaces";
import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export function getMonthName(month: number) {
  switch (month) {
    case 1:
      return "En";
    case 2:
      return "Feb";
    case 3:
      return "Mar";
    case 4:
      return "Abr";
    case 5:
      return "May";
    case 6:
      return "Jun";
    case 7:
      return "Jul";
    case 8:
      return "Ago";
    case 9:
      return "Sep";
    case 10:
      return "Oct";
    case 11:
      return "Nov";
    case 12:
      return "Dic";
    default:
      return "";
  }
}

export function getFillColor(index: number) {
  if (index + 1 <= 10) {
    return `var(--chart-${index + 1})`;
  }
}

export function getMonthlyTrend(records: Record[]) {
  if (records.length === 0) return 0;
  const sorted = [...records].sort((a, b) =>
    a.year === b.year ? a.month - b.month : a.year - b.year
  );
  const current = Number(sorted.at(-1)?.netIncome ?? 0);
  const previous = Number(sorted.at(-2)?.netIncome ?? 0);
  const trend = previous ? ((current - previous) / previous) * 100 : 0;
  return trend;
}