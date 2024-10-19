'use client';

import React from 'react';
import Link from 'next/link';
import { User } from '@prisma/client';
import { usePathname } from 'next/navigation';
import { Icon } from '@/common/constants/icons';
import { BugIcon, UserNav } from '@/common/components/custom';
import { sidebarItems } from '@/modules/admin/components/SidebarItems';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/common/components/ui/breadcrumb';
import {
  Sidebar,
  useSidebar,
  SidebarMenu,
  SidebarRail,
  SidebarGroup,
  SidebarInput,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarMenuItem,
  SidebarProvider,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarGroupContent,
} from '@/common/components/ui/sidebar';
import { Label } from '@/common/components/ui/label';
import { Separator } from '@/common/components/ui/separator';
import { useCurrentUser } from '@/common/hooks/use-current-user';

const CompanyDetails = () => {
  const { state } = useSidebar();

  return (
    <SidebarGroup className={`flex flex-row gap-2 ${state === 'collapsed' ? 'px-0' : 'px-2'} py-3`}>
      <BugIcon className={`w-fit ${state === 'collapsed' ? 'mx-auto' : ''}`} />
      {state !== 'collapsed' && <span className="text-lg font-bold">Entomon Institute</span>}
    </SidebarGroup>
  );
};

const SidebarSearch = () => {
  const { state, toggleSidebar } = useSidebar();

  return (
    <form>
      <SidebarGroup className={`relative py-0 ${state === 'collapsed' ? 'px-0' : ''}`}>
        <SidebarGroupContent className="relative">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <SidebarInput
            id="search"
            autoComplete="off"
            onFocus={() => state !== 'expanded' && toggleSidebar()}
            onClick={() => state !== 'expanded' && toggleSidebar()}
            placeholder={`${state !== 'collapsed' ? 'Search anything...' : ''}`}
            className={`pl-8 ${state === 'collapsed' ? 'cursor-pointer pl-4' : ''}`}
          />
          <Icon
            name="search"
            className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50"
          />
        </SidebarGroupContent>
      </SidebarGroup>
    </form>
  );
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = useCurrentUser();
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <CompanyDetails />
          <SidebarSearch />
        </SidebarHeader>

        <SidebarContent>
          {sidebarItems.navMain.map((section) => (
            <SidebarGroup key={section.title}>
              <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {section.items.map((item) => {
                    const isActive = pathname === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                          <Link
                            href={item.url}
                            className={`flex items-center gap-2 ${isActive ? 'font-semibold text-blue-600' : ''}`}
                          >
                            {item.icon && <Icon name={item.icon} />}
                            {item.title}
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
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

            <Breadcrumb>
              <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                  const url = `/${pathSegments.slice(0, index + 1).join('/')}`;
                  const isLast = index === pathSegments.length - 1;

                  return (
                    <React.Fragment key={url}>
                      <BreadcrumbItem>
                        <BreadcrumbPage>{segment}</BreadcrumbPage>
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <UserNav user={user as User} />
        </header>

        <main className="container mx-auto flex-1 overflow-auto py-10">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
