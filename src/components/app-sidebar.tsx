"use client";

import * as React from "react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { NavSecondary } from "@/components/nav-secondary.tsx";
import ActionSearchBar from "@/components/action-search-bar.tsx";
import { useNavLinks } from "@/data/layout/navbar.tsx";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navLinks = useNavLinks();
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "";

  return (
    <Sidebar className="border-r-2 border-gray-800" {...props}>
      <SidebarHeader className={`sidebar-background`}>
        <div className="p-3 flex items-center justify-start space-x-3 border-b">
          <Image src={`/logo.svg`} alt={`logo`} width={30} height={30} />
          <span className="font-bold text-2xl">AnalytiX</span>
        </div>

        <div className={`${pathname === "/settings" ? "hidden" : "block"}`}>
          <ActionSearchBar />
        </div>
        <NavMain items={navLinks.navMain} />
      </SidebarHeader>
      <SidebarContent className={`sidebar-background`}>
        <NavSecondary items={navLinks.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
