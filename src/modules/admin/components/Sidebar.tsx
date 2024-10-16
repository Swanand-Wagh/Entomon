import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import initials from 'initials';

import { cn } from '@/common/lib/utils';
import { Icon } from '@/common/constants/icons';
import { buttonVariants } from '@/common/components/ui/button';
import { sidebarItems, SidebarItem, NavItem } from './SidebarItems';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/common/components/ui/tooltip';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/common/components/ui/accordion';

const SidebarHeading = ({
  heading,
  isCollapsed,
  isMobileSidebar = false,
}: {
  readonly heading: string;
  readonly isMobileSidebar: boolean;
  readonly isCollapsed: boolean;
}) => {
  return isCollapsed ? (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div className="flex size-9 items-center justify-center rounded-md bg-gray-200">
          <span className="text-sm uppercase text-zinc-500">{initials(heading)}</span>
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {heading}
      </TooltipContent>
    </Tooltip>
  ) : (
    <h4 className={cn('mb-1 mt-2 px-3 text-left text-sm uppercase text-zinc-500', isMobileSidebar && 'px-1')}>
      {heading}
    </h4>
  );
};

const SidebarItemWithChildren = ({
  item,
  isCollapsed = false,
}: {
  readonly item: NavItem;
  readonly isCollapsed?: boolean;
}) => {
  const childRoutes = item.children?.map((child) => child.route || '') ?? [];
  const currentPath = usePathname();
  const isActive = childRoutes.some((route) => currentPath.includes(route));

  return (
    <AccordionItem value={item.title} className="border-none">
      <AccordionTrigger
        className={cn(
          buttonVariants({ variant: 'ghost', size: isCollapsed ? 'icon' : 'sm' }),
          isCollapsed && 'hide-accordion-icon',
          'flex h-9 w-9 items-center justify-between py-0 hover:no-underline',
          isActive && 'bg-accent'
        )}
      >
        {isCollapsed ? (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <div className="flex size-9 items-center justify-center">
                <Icon name={item.icon} className="mr-2 size-4" />
                <span className="sr-only">{item.title}</span>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" className="flex items-center gap-4">
              {item.title}
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center">
            <Icon name={item.icon} className="mr-2 size-4" />
            {item.title}
          </div>
        )}
      </AccordionTrigger>
      <AccordionContent className="mt-1 flex flex-col gap-1 pb-0">
        {item.children?.map((child) =>
          isCollapsed ? (
            <Tooltip key={child.title} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={child.route || '#'} className={cn(buttonVariants({ size: 'icon' }), 'h-9 w-9')}>
                  <span className="text-sm">{initials(child.title)}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {child.title}
                {child.label && <span className="ml-auto text-muted-foreground">{child.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={child.title}
              href={child.route || '#'}
              className={cn(buttonVariants({ size: 'sm' }), 'flex items-center justify-start px-4 py-0')}
            >
              <Icon name="check" className={cn('mr-2 h-3 w-3')} />
              <div className={cn('text-sm duration-200')}>{child.title}</div>
              {child.label && <span className="ml-auto">{child.label}</span>}
            </Link>
          )
        )}
      </AccordionContent>
    </AccordionItem>
  );
};

const CollapsedSidebar = ({ item }: { readonly item: NavItem }) => {
  if (item.children) {
    return <SidebarItemWithChildren item={item} isCollapsed />;
  }

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link href={item.route ?? '#'} className={cn(buttonVariants({ size: 'icon' }), 'h-9 w-9')}>
          <Icon name={item.icon} className="size-4" />
          <span className="sr-only">{item.title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right" className="flex items-center gap-4">
        {item.title}
        {item.label && <span className="ml-auto text-muted-foreground">{item.label}</span>}
      </TooltipContent>
    </Tooltip>
  );
};

const ExpandedSidebar = ({ item }: { readonly item: NavItem }) => {
  if (item.children) {
    return <SidebarItemWithChildren item={item} />;
  }

  return (
    <Link href={item.route ?? '#'} className={cn(buttonVariants({ size: 'sm' }), 'flex items-center justify-start')}>
      <Icon name={item.icon} className="mr-2 size-4" />
      {item.title}
      {item.label && <span className={cn('ml-auto')}>{item.label}</span>}
    </Link>
  );
};

interface NavProps {
  readonly isCollapsed: boolean;
  readonly isMobileSidebar?: boolean;
}

const isNavItem = (item: SidebarItem): item is NavItem => {
  return (item as NavItem).title !== undefined;
};

export const Sidebar = ({ isCollapsed, isMobileSidebar = false }: NavProps) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Accordion type="single" collapsible>
        <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2">
          <nav
            className={cn(
              'grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2',
              isMobileSidebar && 'p-0'
            )}
          >
            {sidebarItems.map((item: SidebarItem) => {
              if (isNavItem(item)) {
                if (isCollapsed) {
                  return <CollapsedSidebar key={item.title} item={item} />;
                }
                return <ExpandedSidebar key={item.title} item={item} />;
              }
              return (
                <SidebarHeading
                  key={item.heading}
                  heading={item.heading}
                  isCollapsed={isCollapsed}
                  isMobileSidebar={isMobileSidebar}
                />
              );
            })}
          </nav>
        </div>
      </Accordion>
    </TooltipProvider>
  );
};
