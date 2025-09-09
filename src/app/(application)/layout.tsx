"use client";

import React, { ReactNode } from "react";
import { AppSidebar } from "@/components/app-sidebar.tsx";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import { NavActions } from "@/components/nav-actions.tsx";
import { usePathname } from "next/navigation";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <SidebarProvider className={``}>
      <AppSidebar />
      <SidebarInset className={``}>
        <header className="flex h-14 shrink-0 items-center gap-2 sidebar-background">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />

            <Breadcrumb>
              <BreadcrumbList>
                {segments.map((segment, index) => {
                  const href = "/" + segments.slice(0, index + 1).join("/");
                  const isLast = index === segments.length - 1;

                  return (
                    <React.Fragment key={href}>
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage className="capitalize">
                            {segment}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <p className="capitalize">{segment}</p>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="ml-auto px-3">
            {pathname.startsWith("/dashboard/analysis") ||
            pathname.startsWith("/dashboard/campaigns") ? (
              <NavActions />
            ) : null}
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 px-4 py-10 sidebar-background">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default Layout;
