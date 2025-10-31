import { UnitContext } from "@/context/unit/UnitContext";
import { useContext } from "react";

export const useUnitContext = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error(
      "useUnitContext must be used within a UnitContextProvider"
    );
  }
  return context;
};
