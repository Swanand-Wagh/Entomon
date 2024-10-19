import React from 'react';

import { Table } from '@tanstack/react-table';
import { Input } from '@/common/components/ui/input';

export const FilterEmail = <TData,>({ table }: { table: Table<TData> }) => {
  return (
    <Input
      className="max-w-sm"
      placeholder="Filter emails..."
      value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
      onChange={(event) => table.getColumn('email')?.setFilterValue(event.target.value)}
    />
  );
};
