import React from 'react';

import { Table } from '@tanstack/react-table';
import { Input } from '@/components/ui/input';

type FilterFieldProps<TData> = {
  table: Table<TData>;
  columnKey: string;
};

export const FilterField = <TData,>({ table, columnKey }: FilterFieldProps<TData>) => {
  return (
    <Input
      className="max-w-sm border-green-200 text-gray-700 placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20"
      placeholder={`Filter ${String(columnKey)}...`}
      value={(table.getColumn(columnKey as string)?.getFilterValue() as string) ?? ''}
      onChange={(event) => table.getColumn(columnKey as string)?.setFilterValue(event.target.value)}
    />
  );
};
