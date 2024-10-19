import React from 'react';

import { Table } from '@tanstack/react-table';
import { Input } from '@/common/components/ui/input';

export const FilterName = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <Input
      className="max-w-sm"
      placeholder="Filter name..."
      value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
      onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
    />
  );
};
