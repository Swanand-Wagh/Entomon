'use client';

import React, { useState } from 'react';

import {
  ColumnDef,
  flexRender,
  SortingState,
  useReactTable,
  getCoreRowModel,
  VisibilityState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { FilterField } from './filter';
import { ExportToCSV } from './export';
import { Pagination } from './pagination';
import { VisibilityColumns } from './visibility';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showExportButton?: boolean;
  showFilter?: boolean;
  filterField?: string;
  showVisibilityColumns?: boolean;
};

export const DataTable = <TData, TValue>({
  columns,
  data,
  showExportButton = true,
  showFilter = true,
  filterField,
  showVisibilityColumns = true,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <div className="flex justify-between py-4">
        {showFilter && <FilterField table={table} columnKey={filterField ?? ''} />}
        <div className="flex gap-4">
          {showExportButton && <ExportToCSV table={table} />}
          {showVisibilityColumns && <VisibilityColumns table={table} />}
        </div>
      </div>

      <div className="max-h-[calc(100vh-16rem)] overflow-y-auto rounded-lg border border-green-200 bg-white shadow-sm">
        <Table>
          <TableHeader style={{ position: 'sticky' }} className="bg-green-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-green-200 hover:bg-green-100/50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-green-800 font-semibold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="bg-white">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow 
                  key={row.id} 
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-green-100 hover:bg-green-50/50 transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-gray-700">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-gray-500">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination table={table} />
    </>
  );
};
