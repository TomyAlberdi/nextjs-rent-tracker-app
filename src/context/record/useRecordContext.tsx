import { RecordContext } from "@/context/record/RecordContext";
import { useContext } from "react";

export const useRecordContext = () => {
  const context = useContext(RecordContext);
  if (!context) {
    throw new Error(
      "useRecordContext must be used within a RecordContextProvider"
    );
  }
  return context;
};