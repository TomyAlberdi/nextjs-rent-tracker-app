"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
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
import { useGroupContext } from "@/context/group/useGroupContext";
import { usePropertyContext } from "@/context/property/usePropertyContext";
import { CreatePropertyDTO, IdNameItem, Property } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Spinner } from "./ui/spinner";

interface CreatePropertyProps {
  ReloadUnits: boolean;
  setReloadUnits: React.Dispatch<React.SetStateAction<boolean>>;
  defaultProperty?: Property;
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
  groupId: z.string().nullable(),
});

const CreateProperty = ({
  defaultProperty,
  ReloadUnits,
  setReloadUnits,
}: CreatePropertyProps) => {
  const router = useRouter();
  const { getDropdownGroups } = useGroupContext();
  const { createProperty, updateProperty } = usePropertyContext();
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [DropdownGroups, setDropdownGroups] = useState<IdNameItem[]>([]);
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultProperty?.name || "",
      description: defaultProperty?.description || "",
      groupId: defaultProperty?.groupId || null,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const data: CreatePropertyDTO = {
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
    if (defaultProperty) {
      const updatedProperty = await updateProperty(defaultProperty.id, data);
      if (updatedProperty) {
        form.reset();
        setReloadUnits(!ReloadUnits);
        setDrawerOpen(false);
        router.push(`/unit/${updatedProperty.id}`);
      }
    } else {
      const createdProperty = await createProperty(data);
      if (createdProperty) {
        form.reset();
        setReloadUnits(!ReloadUnits);
        setDrawerOpen(false);
        router.push(`/unit/${createdProperty.id}`);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getDropdownGroups().then((data) => setDropdownGroups(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Drawer direction="right" open={DrawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        {defaultProperty ? (
          <Button variant={"secondary"} className="w-full">
            <PencilLine />
            Editar Unidad
          </Button>
        ) : (
          <Button>
            <CirclePlus />
            Crear Unidad
          </Button>
        )}
      </DrawerTrigger>
      <DrawerContent
        aria-describedby={undefined}
        className="text-sidebar-primary justify-center "
      >
        <DrawerHeader>
          <DrawerTitle className="text-sidebar-primary text-2xl">
            {defaultProperty ? "Editar" : "Crear"} Unidad
          </DrawerTitle>
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
                      defaultValue={defaultProperty?.groupId || undefined}
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
                {defaultProperty ? (
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

export default CreateProperty;
