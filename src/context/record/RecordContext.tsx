import type {
  CreateRecordDTO,
  MonthlySummaryRecordDTO,
  ParentSummaryRecordDTO,
  Record,
  UnitType,
} from "@/lib/interfaces";
import { createContext } from "react";

export interface RecordContextType {
  getRecords: (
    type: UnitType,
    parentId: string,
    year: number
  ) => Promise<Record[]>;
  saveRecord: (record: CreateRecordDTO) => Promise<void>;
  deleteRecord: (id: string) => Promise<void>;
  getMonthlySummary: (year: number) => Promise<MonthlySummaryRecordDTO[]>;
  getParentSummary: (
    year: number,
    parentType: UnitType
  ) => Promise<ParentSummaryRecordDTO[]>;
}

export const RecordContext = createContext<RecordContextType | null>(null);