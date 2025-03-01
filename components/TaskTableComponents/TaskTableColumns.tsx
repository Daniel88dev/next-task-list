"use client";

import { ColumnDef } from "@tanstack/table-core";
import { TaskTableType } from "@/drizzle/taskTable";
import { format } from "date-fns";
import {
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
    header: () => <div className="text-left">Priority</div>,
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
    header: () => <div className="text-right">Due Date</div>,
    cell: ({ row }) => {
      const date: Date | null = row.getValue("dueDate");
      const dateString = date ? format(date, "PPP") : "";

      return <div className="text-right font-medium">{dateString}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-left">Status</div>,
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
        case "done":
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
                  task.title + " - " + task.description
                )
              }
            >
              Copy Task Detail
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
