"use client";

import { ColumnDef } from "@tanstack/table-core";
import { TaskTableType } from "@/drizzle/taskTable";

export const taskTableColumns: ColumnDef<TaskTableType>[] = [
  {
    accessorKey: "title",
    header: () => <div className="text-left">Title</div>,
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-left">Description</div>,
    cell: ({ row }) => {
      // reduce description length (if description exist) to 50 characters
      const description: string | null = row.getValue("description");
      const descriptionLength = description ? description.length : 0;

      const shortenedDescription = description
        ? description.substring(0, 50)
        : "";

      return (
        <div className="text-left">
          {shortenedDescription}
          {descriptionLength > 50 ? "..." : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
  {
    accessorKey: "dueDate",
    header: () => <div className="text-right">Due Date</div>,
    cell: ({ row }) => {
      const date = parseFloat(row.getValue("dueDate"));
      const dateString = new Date(date).toLocaleDateString();

      return <div className="text-right font-medium">{dateString}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
