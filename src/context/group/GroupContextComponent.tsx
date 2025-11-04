import {
  GroupContext,
  type GroupContextType,
} from "@/context/group/GroupContext";
import type { CreateGroupDTO } from "@/lib/interfaces";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

interface GroupContextComponentProps {
  children: ReactNode;
}

const GroupContextComponent: React.FC<GroupContextComponentProps> = ({
  children,
}) => {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/group`;

  const getDropdownGroups = async () => {
    try {
      const url = `${BASE_URL}/list/light`;
      const res = await fetch(url);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener los grupos");
        console.warn("No groups found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch groups", err);
      toast.error("Ocurrió un error al obtener los grupos");
      return [];
    }
  };

  const getGroups = async () => {
    try {
      const url = `${BASE_URL}/list`;
      const res = await fetch(url);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener los grupos");
        console.warn("No groups found: ", res);
        return [];
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch groups", err);
      toast.error("Ocurrió un error al obtener los grupos");
      return [];
    }
  };

  const getGroupById = async (groupId: string) => {
    try {
      const url = `${BASE_URL}/${groupId}`;
      const res = await fetch(url);
      if (!res.ok) {
        toast.error("Ocurrió un error al obtener el grupo");
        console.warn("No group found: ", res);
        return null;
      }
      const data = await res.json();
      return data;
    } catch (err) {
      console.error("Failed to fetch group", err);
      toast.error("Ocurrió un error al obtener el grupo");
      return null;
    }
  };

  const createGroup = async (group: CreateGroupDTO) => {
    try {
      const response = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(group),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al crear el grupo");
        return;
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to create group", err);
      toast.error("Ocurrió un error al crear el grupo");
    }
  };

  const updateGroup = async (groupId: string, group: CreateGroupDTO) => {
    try {
      const response = await fetch(`${BASE_URL}/${groupId}`, {
        method: "PUT",
        body: JSON.stringify(group),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al actualizar el grupo");
        return;
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Failed to update group", err);
      toast.error("Ocurrió un error al actualizar el grupo");
    }
  };

  const deleteGroup = async (groupId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${groupId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Ocurrió un error al eliminar el grupo");
        console.warn("Failed to delete group:", groupId);
        return;
      }
    } catch (err) {
      console.error("Failed to delete group", err);
      toast.error("Ocurrió un error al eliminar el grupo");
    }
  };

  const [ReloadGroups, setReloadGroups] = useState(false);

  const exportData: GroupContextType = {
    getDropdownGroups,
    getGroups,
    getGroupById,
    createGroup,
    updateGroup,
    deleteGroup,
    ReloadGroups,
    setReloadGroups,
  };

  return (
    <GroupContext.Provider value={exportData}>{children}</GroupContext.Provider>
  );
};

export default GroupContextComponent;
