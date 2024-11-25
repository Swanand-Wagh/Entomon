import React, { Suspense } from 'react';

import { User, UserRole } from '@prisma/client';
import { currentUser } from '@/common/lib/auth';
import { RoleGate } from '@/common/feature-flags';
import { Loading } from '@/common/components/custom';
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

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
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

            <UserNav user={user as User} />
          </header>

          <Suspense fallback={<Loading />}>
            <main className="container mx-auto flex-1 overflow-auto py-10">{children}</main>
          </Suspense>
        </SidebarInset>
      </SidebarProvider>
    </RoleGate>
  );
}
