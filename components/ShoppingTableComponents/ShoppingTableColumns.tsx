"use client";

import { ColumnDef } from "@tanstack/table-core";
import { ShoppingListItemType } from "@/drizzle/shoppingList";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { categoryList } from "@/app/(auth)/shopping/_components/categoryTypes";
import { format } from "date-fns";
import { onPurchaseShoppingItem } from "@/app/(auth)/shopping/shoppingActions";
import { tryCatch } from "@/lib/try-catch";
import { toast } from "sonner";

export const shoppingTableColumns: ColumnDef<ShoppingListItemType>[] = [
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
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.getValue("category");

      const categoryItem = categoryList.find((item) => item.name === category);

      if (!categoryItem) {
        return <div className="text-left">category not found</div>;
      }

      return (
        <div className="text-left flex flex-row gap-2 items-center">
          {categoryItem.icon}
          {categoryItem.label}
        </div>
      );
    },
    filterFn: (row, columnId, filterValues) => {
      if (!filterValues || filterValues.length === 0) return true;
      return filterValues.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date = row.getValue("createdAt");
      const dateString = format(date, "PPP");

      return <div className="text-left font-medium">{dateString}</div>;
    },
  },
  {
    accessorKey: "isOpen",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Purchased
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const isOpen: boolean = row.getValue("isOpen");

      return <Checkbox defaultChecked={!isOpen} disabled />;
    },
  },
  {
    accessorKey: "completedAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Completed At
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: Date | null = row.getValue("completedAt");
      const dateString = date ? format(date, "PPP") : "";

      return <div className="text-left font-medium">{dateString}</div>;
    },
  },
  {
    id: "action",
    header: () => <div className="text-left">Action</div>,
    cell: ({ row }) => {
      const shoppingItem = row.original;

      return (
        <Button
          disabled={!shoppingItem.isOpen}
          onClick={async () => {
            const { data: status, error } = await tryCatch(
              onPurchaseShoppingItem(shoppingItem.id)
            );
            if (error) {
              toast.error("Problem to get Server Response", {
                style: { backgroundColor: "red" },
              });
            } else if (!status?.success) {
              toast.error(status?.message, {
                style: { backgroundColor: "red" },
              });
            } else {
              toast.success(status.message);
            }
          }}
        >
          Purchase
        </Button>
      );
    },
  },
];
