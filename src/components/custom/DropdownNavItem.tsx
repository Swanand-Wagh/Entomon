'use client';

import React from 'react';
import Link from 'next/link';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NavbarOption, NavbarProps } from '@/types/navbar';
import { Icon } from '@/constants/icons';

export type DropdownNavItemProps = {
  item: NavbarProps;
};

const DropdownLink = ({ url, name, description }: NavbarOption) => (
  <Link
    href={url}
    className="group grid h-auto w-full items-center justify-start gap-1 rounded-md bg-background p-4 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
    prefetch={false}
  >
    <div className="text-sm font-medium leading-none group-hover:underline">{name}</div>
    {description && <div className="line-clamp-2 text-sm leading-snug text-muted-foreground">{description}</div>}
  </Link>
);

export const DropdownNavItem: React.FC<Readonly<DropdownNavItemProps>> = ({ item }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer items-center gap-1 text-sm font-medium transition-colors hover:text-primary">
          {item.name}
          <Icon name="chevronDown" className="h-4 w-4 transition-all" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {item.options?.map((option) => (
          <DropdownMenuItem key={option.name} asChild>
            <DropdownLink url={option.url ?? '#'} name={option.name} description={option.description} />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
