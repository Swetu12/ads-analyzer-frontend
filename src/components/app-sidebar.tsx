"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { navLinks } from "@/data/layout/navbar.tsx";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <NavMain items={navLinks.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
