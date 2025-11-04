import CreateGroup from "@/components/createGroup";
import CreateUnit from "@/components/createUnit";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGroupContext } from "@/context/group/useGroupContext";
import { useUnitContext } from "@/context/unit/useUnitContext";
import { Group, Unit } from "@/lib/interfaces";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface objectInfoProps {
  object: Unit | Group;
}

const ObjectInfo = ({ object }: objectInfoProps) => {
  const router = useRouter();
  const { deleteUnit, ReloadUnits, setReloadUnits } = useUnitContext();
  const { deleteGroup, ReloadGroups, setReloadGroups } = useGroupContext();

  const [LoadingDelete, setLoadingDelete] = useState(false);

  const onDeleteClick = () => {
    toast(
      `¿Desea eliminar ${"properties" in object ? "el grupo" : "la unidad"}?`,
      {
        description: "Se perderán todos los registros asociados.",
        action: (
          <Button
            className="bg-popover text-sidebar-primary hover:bg-popover/90 hover:text-sidebar-primary"
            onClick={() => handleDelete()}
          >
            Eliminar
          </Button>
        ),
      }
    );
  };

  const handleDelete = async () => {
    setLoadingDelete(true);
    if ("properties" in object) {
      deleteGroup(object.id).finally(() => {
        setLoadingDelete(false);
        setReloadGroups(!ReloadGroups);
        router.back();
      });
    } else {
      deleteUnit(object.id).finally(() => {
        setLoadingDelete(false);
        setReloadUnits(!ReloadUnits);
        router.back();
      });
    }
  };

  return (
    <div className="h-full w-1/4 bg-popover flex flex-col gap-3 border-l">
      <CardHeader className="pt-4">
        <CardTitle className="flex flex-col gap-2">
          <span>{"properties" in object ? "Grupo" : "Unidad"}</span>
          <span className="text-3xl">{object.name}</span>
        </CardTitle>
        <CardDescription>{object.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {/* TODO: add properties component to group info */}
        {"properties" in object && <span>propiedades</span>}
      </CardContent>
      <CardContent className="flex flex-col gap-2 border-y py-2">
        <span className="text-xl">Administración</span>
        {"properties" in object ? (
          <>
            <CreateGroup defaultGroup={object} />
            {/* TODO: style delete button */}
            <Button onClick={onDeleteClick} disabled={LoadingDelete}>
              <Trash2 />
              Eliminar grupo
            </Button>
          </>
        ) : (
          <>
            <CreateUnit defaultUnit={object} />
            <Button onClick={onDeleteClick} disabled={LoadingDelete}>
              <Trash2 />
              Eliminar unidad
            </Button>
          </>
        )}
      </CardContent>
    </div>
  );
};

export default ObjectInfo;
