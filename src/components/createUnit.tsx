"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useGroupContext } from "@/context/group/useGroupContext";
import { useUnitContext } from "@/context/unit/useUnitContext";
import { CreateUnitDTO, IdNameItem, Unit } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CirclePlus, PencilLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

interface CreateUnitProps {
  ReloadUnits: boolean;
  setReloadUnits: React.Dispatch<React.SetStateAction<boolean>>;
  ReloadGroups: boolean;
  defaultUnit?: Unit;
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  groupId: z.string().nullable(),
});

const CreateUnit = ({
  defaultUnit,
  ReloadUnits,
  setReloadUnits,
  ReloadGroups,
}: CreateUnitProps) => {
  const router = useRouter();
  const { getDropdownGroups } = useGroupContext();
  const { createUnit, updateUnit } = useUnitContext();
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [DropdownGroups, setDropdownGroups] = useState<IdNameItem[]>([]);
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultUnit?.name || "",
      description: defaultUnit?.description || "",
      groupId: defaultUnit?.groupId || null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const data: CreateUnitDTO = {
      name: values.name,
      description: values.description || null,
      type:
        values.groupId == undefined || values.groupId == "none"
          ? "INDIVIDUAL"
          : "GROUPED",
      groupId:
        values.groupId == undefined || values.groupId == "none"
          ? null
          : values.groupId,
    };
    if (defaultUnit) {
      const updatedUnit = await updateUnit(defaultUnit.id, data);
      if (updatedUnit) {
        form.reset();
        setReloadUnits(!ReloadUnits);
        setDrawerOpen(false);
        router.push(`/unit/${updatedUnit.id}`);
      }
    } else {
      const createdUnit = await createUnit(data);
      if (createdUnit) {
        form.reset();
        setReloadUnits(!ReloadUnits);
        setDrawerOpen(false);
        router.push(`/unit/${createdUnit.id}`);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getDropdownGroups().then((data) => setDropdownGroups(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ReloadGroups]);

  return (
    <Drawer direction="right" open={DrawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        {defaultUnit ? (
          <Button variant={"secondary"} className="w-full">
            <PencilLine />
            Editar Unidad
          </Button>
        ) : (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer rounded-xs"
                onClick={() => setDrawerOpen(true)}
              >
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-xs">
                  <Box className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight truncate">
                  <span>Crear Unidad</span>
                </div>
                <Plus className="ml-auto size-4" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        )}
      </DrawerTrigger>
      <DrawerContent
        aria-describedby={undefined}
        className="text-sidebar-primary justify-center"
      >
        <DrawerHeader>
          <DrawerTitle className="text-sidebar-primary text-2xl">
            {defaultUnit ? "Editar" : "Crear"} Unidad
          </DrawerTitle>
          <DrawerDescription>
            Una unidad permite agrupar gastos e ingresos.
          </DrawerDescription>
        </DrawerHeader>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 px-2"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="groupId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grupo</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={defaultUnit?.groupId || undefined}
                      disabled={DropdownGroups.length === 0}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un grupo (opcional)" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DropdownGroups.map((group) => (
                          <SelectItem key={group.id} value={group.id}>
                            {group.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button disabled={Loading}>
                {defaultUnit ? (
                  <>
                    {Loading ? <Spinner /> : <PencilLine />}
                    Editar
                  </>
                ) : (
                  <>
                    {Loading ? <Spinner /> : <CirclePlus />}
                    Crear
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateUnit;
