export interface IdNameItem {
  id: string;
  name: string;
}

export interface Unit {
  id: string;
  name: string;
  description: string | null;
  type: UnitType;
  groupId: string | null;
}

export interface CreateUnitDTO {
  name: string;
  description: string | null;
  type: UnitType;
  groupId: string | null;
}

export interface Group {
  id: string;
  name: string;
  description: string | null;
  properties: Unit[];
}

export interface CreateGroupDTO {
  name: string;
  description: string | null;
}

export interface Record {
  id: string | null;
  type: UnitType;
  parentId: string;
  month: number;
  year: number;
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  netIncome: number;
  // internal fields (not stored in database)
  monthName?: string | null;
  parentName?: string | null;
}

export interface CreateRecordDTO {
  id: string | null,
  type: UnitType;
  parentId: string;
  month: number;
  year: number;
  transactions: Transaction[];
}

export interface Transaction {
  title: string;
  description: string | null;
  amount: number;
  type: ExpenseType;
  // internal fields (not stored in database)
  temporalId?: string;
}

export interface MonthlySummaryRecordDTO {
  month: number;
  year: number;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  // internal fields (not stored in database)
  monthName?: string | null;
}

export interface ParentSummaryRecordDTO {
  year: number;
  netIncome: number;
  parentType: UnitType;
  parentId: string;
  parentName: string;
  // internal fields (not stored in database)
  fill?: string;
}

export type UnitType = 'INDIVIDUAL' | 'GROUPED';

export type ExpenseType = 'INCOME' | 'EXPENSE';