
import { UnitContext, UnitContextType } from "@/context/unit/UnitContext";
import { CreateUnitDTO } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

interface UnitContextComponentProps {
  children: ReactNode;
}

const UnitContextComponent: React.FC<UnitContextComponentProps> = ({
  children,
}) => {
  const router = useRouter();

  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/property`;

  const getUnits = async () => {
    try {
      const res = await fetch(`${BASE_URL}`);
      if (!res.ok) {
        console.warn("No properties found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch properties", err);
      toast.error("Ocurrió un error al obtener las unidades");
      return [];
    }
  };

  const getUnitById = async (id: string) => {
    try {
      const res = await fetch(`${BASE_URL}/${id}`);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener la unidad");
        console.warn("No Unit found: ", res);
        return null;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch Unit", err);
      toast.error("Ocurrió un error al obtener la unidad");
      router.push("/notFound");
      return null;
    }
  };

  const createUnit = async (Unit: CreateUnitDTO) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(Unit),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al crear la unidad");
        return;
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to create Unit", err);
      toast.error("Ocurrió un error al crear la unidad");
    }
  };

  const updateUnit = async (id: string, Unit: CreateUnitDTO) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(Unit),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al actualizar la unidad");
        return;
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to update Unit", err);
      toast.error("Ocurrió un error al actualizar la unidad");
    }
  };

  const deleteUnit = async (id: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al eliminar la unidad");
        console.warn("Failed to delete Unit:", id);
        return;
      }
    } catch (err) {
      console.error("Failed to delete Unit", err);
      toast.error("Ocurrió un error al eliminar la unidad");
    }
  };

  const exportData: UnitContextType = {
    getUnits,
    getUnitById,
    createUnit,
    updateUnit,
    deleteUnit,
  };

  return (
    <UnitContext.Provider value={exportData}>
      {children}
    </UnitContext.Provider>
  );
};

export default UnitContextComponent;
