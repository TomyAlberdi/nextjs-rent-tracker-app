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
  if (records.length === 0 || records.length === 1) return 0;
  const currentMonth = records[records.length - 1].netIncome;
  const previousMonth = records[records.length - 2].netIncome;
  if (previousMonth === 0) return 0;
  const trend =
    ((currentMonth - previousMonth) / Math.abs(previousMonth)) * 100;
  return parseFloat(trend.toFixed(2));
}

export function getExpenseRatio(records: Record[]) {
  if (records.length === 0) return 0;
  const currentMonth = records[records.length - 1];
  const expense = currentMonth.totalExpense;
  const netIncome = currentMonth.netIncome;
  if (expense === 0 || netIncome === 0) return 0;
  const ratio = (expense / netIncome) * 100;
  return parseFloat(ratio.toFixed(2));
}
