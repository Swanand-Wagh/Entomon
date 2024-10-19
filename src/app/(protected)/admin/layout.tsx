import React from 'react';
import { CustomBreadcrumbs, UserNav } from '@/common/components/custom';
import { sidebarItemsList, SidebarSearch, CompanyDetails, SidebarItems } from '@/modules/admin';

import {
  Sidebar,
  SidebarMenu,
  SidebarRail,
  SidebarGroup,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarProvider,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/common/components/ui/sidebar';
import { Separator } from '@/common/components/ui/separator';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <CompanyDetails />
          <SidebarSearch />
        </SidebarHeader>

        <SidebarContent>
          {sidebarItemsList.map((section) => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarItems sidebarSection={section} />
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b pl-4 pr-8">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <CustomBreadcrumbs />
          </div>

          <UserNav />
        </header>

        <main className="container mx-auto flex-1 overflow-auto py-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
