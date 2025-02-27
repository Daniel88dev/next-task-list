"use client";

import { ColumnDef } from "@tanstack/table-core";
import { TaskTableType } from "@/drizzle/taskTable";
import { Checkbox } from "@/components/ui/checkbox";
import { TableHead } from "@/components/ui/table";

export const TaskTableColumns: ColumnDef<TaskTableType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label={"Select all"}
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => <TableHead>Title {column.getSize()}</TableHead>,
    cell: ({ row }) => {
      return <p>{row.getValue("title")}</p>;
    },
  },
];
