"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@repo/ui/components/ui/table";
import React from "react";

interface DataTableProps<T> {
  columns: React.ReactNode[];
  data: T[];
  isLoading: boolean;
  loadingText: string;
  emptyText: string;
  renderRow: (item: T) => React.ReactNode;
}

export const DataTable = <T,>({
  columns,
  data,
  isLoading,
  loadingText,
  emptyText,
  renderRow,
}: DataTableProps<T>) => {
  const colSpan = columns.length;

  return (
    <Table>
      <TableHeader className="bg-muted/60">
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className="px-6 py-4 font-medium">
              {col}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {isLoading && (
          <TableRow>
            <TableCell
              colSpan={colSpan}
              className="px-6 py-4 text-center text-muted-foreground animate-pulse"
            >
              {loadingText}
            </TableCell>
          </TableRow>
        )}

        {!isLoading && data.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={colSpan}
              className="px-6 py-4 text-center text-muted-foreground"
            >
              {emptyText}
            </TableCell>
          </TableRow>
        )}

        {!isLoading && data.length > 0 && data.map(renderRow)}
      </TableBody>
    </Table>
  );
};
