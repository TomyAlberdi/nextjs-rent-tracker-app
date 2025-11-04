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
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Spinner } from "@/components/ui/spinner";
import { useGroupContext } from "@/context/group/useGroupContext";
import { CreateGroupDTO, Group } from "@/lib/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Boxes, CirclePlus, PencilLine, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

interface CreateGroupProps {
  defaultGroup?: Group;
}

const formSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().optional(),
});

const CreateGroup = ({ defaultGroup }: CreateGroupProps) => {
  const router = useRouter();
  const { createGroup, updateGroup, ReloadGroups, setReloadGroups } =
    useGroupContext();
  const [DrawerOpen, setDrawerOpen] = useState(false);
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultGroup?.name || "",
      description: defaultGroup?.description || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    const data: CreateGroupDTO = {
      name: values.name,
      description: values.description || null,
    };
    if (defaultGroup) {
      const updatedGroup = await updateGroup(defaultGroup.id, data);
      if (updatedGroup) {
        form.reset();
        setReloadGroups(!ReloadGroups);
        setDrawerOpen(false);
        router.push(`/group/${updatedGroup.id}`);
      }
    } else {
      const createdGroup = await createGroup(data);
      if (createdGroup) {
        form.reset();
        setReloadGroups(!ReloadGroups);
        setDrawerOpen(false);
        router.push(`/group/${createdGroup.id}`);
      }
    }
    setLoading(false);
  };

  return (
    <Drawer direction="right" open={DrawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        {defaultGroup ? (
          <Button variant={"secondary"} className="w-full bg-sidebar-primary text-popover hover:bg-sidebar-primary/90">
            <PencilLine />
            Editar Grupo
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
                  <Boxes className="size-5" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight truncate">
                  <span>Crear Grupo</span>
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
            {defaultGroup ? "Editar" : "Crear"} Grupo
          </DrawerTitle>
          <DrawerDescription>
            Un grupo permite asociar 2 o más unidades.
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
              <Button type="submit" disabled={Loading}>
                {defaultGroup ? (
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

export default CreateGroup;
