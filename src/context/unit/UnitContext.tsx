import { CreateUnitDTO, Unit } from "@/lib/interfaces";
import { createContext } from "react";

export interface UnitContextType {
  getUnits: () => Promise<Unit[]>;
  getUnitById: (id: string) => Promise<Unit | null>;
  createUnit: (Unit: CreateUnitDTO) => Promise<Unit | null>;
  updateUnit: (
    groupId: string,
    Unit: CreateUnitDTO
  ) => Promise<Unit | null>;
  deleteUnit: (id: string) => Promise<void>;
}

export const UnitContext = createContext<UnitContextType | null>(null);
