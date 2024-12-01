import React, { Suspense } from 'react';

import { User } from '@prisma/client';
import { currentUser } from '@/common/lib/auth';
import { Loading } from '@/common/components/custom';
import { Separator } from '@/common/components/ui/separator';
import { CustomBreadcrumbs, UserNav } from '@/common/components/custom';

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

import {
  SidebarItems,
  SidebarSearch,
  CompanyDetails,
  userSidebarItemsList,
  adminSidebarItemsList,
} from '@/common/components/custom/dashboard-layout';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <CompanyDetails />
          <SidebarSearch />
        </SidebarHeader>

        <SidebarContent>
          {((user?.role === 'ADMIN' ? adminSidebarItemsList : userSidebarItemsList) || []).map((section) => (
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
  );
}
