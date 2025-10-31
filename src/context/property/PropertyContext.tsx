import { CreatePropertyDTO, Property } from "@/lib/interfaces";
import { createContext } from "react";

export interface PropertyContextType {
  getProperties: () => Promise<Property[]>;
  getPropertyById: (id: string) => Promise<Property | null>;
  createProperty: (property: CreatePropertyDTO) => Promise<Property | null>;
  updateProperty: (
    groupId: string,
    property: CreatePropertyDTO
  ) => Promise<Property | null>;
  deleteProperty: (id: string) => Promise<void>;
}

export const PropertyContext = createContext<PropertyContextType | null>(null);
