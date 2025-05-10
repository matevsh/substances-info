import { GalleryVerticalEnd } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { api } from "~/trpc/server";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const groups = await api.substances.get();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {groups.map((group) => (
              <SidebarMenuItem key={group.id}>
                <SidebarMenuButton asChild>
                  <a href={group.value} className="font-medium">
                    {group.name}
                  </a>
                </SidebarMenuButton>
                {group.subGroups?.length ? (
                  <SidebarMenuSub>
                    {group.subGroups.map((subgroup) => (
                      <div key={subgroup.id}>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild isActive={false}>
                            <a href={subgroup.value}>{subgroup.name}</a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSub>
                          {subgroup.substances.map((substance) => (
                            <SidebarMenuSubItem key={substance.id}>
                              <SidebarMenuSubButton asChild isActive={false}>
                                <a href={substance.value}>{substance.name}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </div>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
