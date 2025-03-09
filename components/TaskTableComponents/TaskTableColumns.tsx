"use client";

import { ColumnDef } from "@tanstack/table-core";
import { TaskTableType } from "@/drizzle/taskTable";
import { format } from "date-fns";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  ListTodo,
  Minus,
  MoreHorizontal,
  ShieldAlert,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { finishTask } from "@/app/(auth)/tasks/taskActions";
import { toast } from "sonner";

export const taskTableColumns: ColumnDef<TaskTableType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "taskUserId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left">{row.getValue("taskUserId")}</div>;
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
        <div className="text-left w-[400px]">
          {shortenedDescription}
          {descriptionLength > 50 ? "..." : ""}
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Priority
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const priority: string = row.getValue("priority");

      let Icon = Minus;

      switch (priority) {
        case "low":
          Icon = ChevronDown;
          break;
        case "medium":
          Icon = Minus;
          break;
        case "high":
          Icon = ChevronUp;
          break;
        case "urgent":
          Icon = ShieldAlert;
          break;
        default:
          Icon = Minus;
      }

      return (
        <div className="flex flex-row text-left gap-2">
          <Icon className="h-4 w-4" /> {row.getValue("priority")}
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date | null = row.getValue("dueDate");
      const dateString = date ? format(date, "PPP") : "";

      return <div className="text-left font-medium">{dateString}</div>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status: string = row.getValue("status");

      let Icon = <ListTodo />;

      let statusText = "";

      switch (status) {
        case "todo":
          Icon = <ListTodo />;
          statusText = "To Do";
          break;
        case "in_progress":
          Icon = <Ellipsis />;
          statusText = "In Progress";
          break;
        case "completed":
          Icon = <Check />;
          statusText = "Done";
          break;
        default:
          Icon = <Check />;
          statusText = "To Do";
      }

      return (
        <div className="text-left flex flex-row gap-2 items-center">
          {Icon} {statusText}
        </div>
      );
    },
    filterFn: (row, columnId, filterValues) => {
      if (!filterValues || filterValues.length === 0) return true; // No filter applied, show all rows
      return filterValues.includes(row.getValue(columnId)); // Match any of the selected statuses
    },
  },
  {
    id: "actions",
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row }) => {
      const task = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(
                  task.taskUserId +
                    " - " +
                    task.title +
                    " - " +
                    task.description
                )
              }
            >
              Copy Task Detail
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const status = await finishTask(task.id);
                if (!status) {
                  toast.error("Failed to finish task", {
                    style: { backgroundColor: "red" },
                  });
                } else {
                  toast.success("Task closed");
                }
              }}
            >
              Finish Task
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/tasks/${task.id}/comment`}>Edit Comment</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Edit Task</DropdownMenuItem>
            <DropdownMenuItem>Change Due Date</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
