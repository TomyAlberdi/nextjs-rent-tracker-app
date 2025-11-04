import type { CreateGroupDTO, Group, IdNameItem } from "@/lib/interfaces";
import { createContext } from "react";

export interface GroupContextType {
  getDropdownGroups: () => Promise<IdNameItem[]>;
  getGroups: () => Promise<Group[]>;
  getGroupById: (groupId: string) => Promise<Group | null>;
  createGroup: (group: CreateGroupDTO) => Promise<Group | null>;
  updateGroup: (groupId: string, group: CreateGroupDTO) => Promise<Group | null>;
  deleteGroup: (groupId: string) => Promise<void>;
  ReloadGroups: boolean;
  setReloadGroups: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GroupContext = createContext<GroupContextType | null>(null);