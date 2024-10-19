import React from 'react';

import {
  DropdownMenu,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from '@/common/components/ui/dropdown-menu';
import { Table } from '@tanstack/react-table';
import { Icon } from '@/common/constants/icons';
import { Button } from '@/common/components/ui/button';

export const VisibilityColumns = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="Toggle columns" variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
          <Icon name="mixer" className="mr-2 size-4 font-bold" /> View
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                <span className="truncate">{column.id}</span>
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
