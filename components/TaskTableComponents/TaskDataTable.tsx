"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnDef, getCoreRowModel } from "@tanstack/table-core";
import { flexRender, useReactTable } from "@tanstack/react-table";
// import { useReactTable } from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TaskDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  // return (
  //   <div className={"space-y-4"}>
  //     <div className={"rounded-md border"}>
  //       <Table>
  //         <TableHeader>
  //           <TableRow>
  //             <TableHead>Title</TableHead>
  //             <TableHead>Description</TableHead>
  //             <TableHead>Priority</TableHead>
  //             <TableHead>Due Date</TableHead>
  //             <TableHead>Status</TableHead>
  //           </TableRow>
  //         </TableHeader>
  //         <TableBody>
  //           {/*{tasks.map((taskRecord) => (*/}
  //           {/*  <TableRow key={`taskRecord-${taskRecord.id}`}>*/}
  //           {/*    <TableCell>{taskRecord.title}</TableCell>*/}
  //           {/*    <TableCell>{taskRecord.description}</TableCell>*/}
  //           {/*    <TableCell>{taskRecord.priority}</TableCell>*/}
  //           {/*    <TableCell>*/}
  //           {/*      {taskRecord.dueDate*/}
  //           {/*        ? format(taskRecord.dueDate, "PPP")*/}
  //           {/*        : "No Date selected"}*/}
  //           {/*    </TableCell>*/}
  //           {/*    <TableCell>{taskRecord.status}</TableCell>*/}
  //           {/*  </TableRow>*/}
  //           {/*))}*/}
  //         </TableBody>
  //       </Table>
  //     </div>
  //   </div>
  // );
}
