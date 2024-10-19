'use client';

import React, { ReactNode, useState, useRef } from 'react';

import { RoleGate } from '@/modules/auth';
import { User, UserRole } from '@prisma/client';

import { Icon } from '@/common/constants/icons';
import { ImperativePanelHandle, PanelResizeHandle } from 'react-resizable-panels';

import { cn } from '@/common/lib/utils';
import { Button } from '@/common/components/ui/button';
import { Separator } from '@/common/components/ui/separator';
import { ResizablePanel, ResizablePanelGroup } from '@/common/components/ui/resizable';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/common/components/ui/sheet';

import { Sidebar } from '@/modules/admin';
import { BugIcon, UserNav } from '@/common/components/custom';
import { useScreenSize } from '@/common/hooks/use-screen-size';
import { useRouteChange } from '@/common/hooks/use-route-change';
import { useCurrentUser } from '@/common/hooks/use-current-user';

type LayoutProps = {
  readonly children: ReactNode;
};

const appConfig = {
  appName: 'Entomon Institite',
  appShortName: <BugIcon />,
};

export default function AdminLayout({ children }: LayoutProps) {
  const user = useCurrentUser();
  const isMediumOrSmaller = useScreenSize();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const panelRef = useRef<ImperativePanelHandle | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useRouteChange(() => {
    setIsMobileNavOpen(false);
  });

  const handleTogglePanel = () => {
    if (panelRef.current) {
      if (isCollapsed) {
        panelRef.current.expand();
      } else {
        panelRef.current.collapse();
      }
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <RoleGate allowedRole={UserRole.ADMIN}>
      <main>
        <ResizablePanelGroup direction="horizontal" className="min-h-screen items-stretch">
          <ResizablePanel
            collapsible
            minSize={18}
            maxSize={18}
            ref={panelRef}
            defaultSize={18}
            collapsedSize={4}
            onCollapse={() => {
              setIsCollapsed(true);
            }}
            onExpand={() => {
              setIsCollapsed(false);
            }}
            className={cn(
              'hidden !overflow-visible border-r lg:block',
              isCollapsed && 'min-w-[50px] transition-all duration-300 ease-in-out'
            )}
          >
            <div
              className={cn('relative flex h-[52px] items-center', isCollapsed ? 'h-[52px] justify-center' : 'px-2')}
            >
              <h1>{!isCollapsed ? appConfig.appName : appConfig.appShortName}</h1>

              <Button
                size="icon"
                variant="outline"
                onClick={handleTogglePanel}
                className="absolute right-[-12px] size-6 rounded-full border-none bg-gray-200"
              >
                <span className="transition-transform duration-300 ease-in-out">
                  <Icon
                    name="chevronBack"
                    className={cn('size-4 transform', isCollapsed ? 'rotate-180' : 'rotate-0')}
                  />
                </span>
              </Button>
            </div>
            <Separator />
            <Sidebar isCollapsed={isCollapsed} />
          </ResizablePanel>

          <ResizablePanel defaultSize={!isMediumOrSmaller ? 82 : 100}>
            <div className="flex items-center justify-between px-4 py-2 lg:justify-end">
              <Button
                variant="default"
                className="size-9 p-1 md:flex lg:hidden"
                onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              >
                <Icon name="hamburger" className="size-6" />
              </Button>

              <div className="flex gap-2">
                <UserNav user={user as User} />
              </div>
            </div>
            <Separator />
            <div className="p-4">{children}</div>
          </ResizablePanel>
          <PanelResizeHandle />
        </ResizablePanelGroup>

        <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
          <SheetDescription>...</SheetDescription>

          <SheetContent className="px-2 py-3" side="left">
            <SheetHeader>
              <SheetTitle className="text-left">{appConfig.appName}</SheetTitle>
            </SheetHeader>
            <Sidebar isMobileSidebar isCollapsed={false} />
          </SheetContent>
        </Sheet>
      </main>
    </RoleGate>
  );
}