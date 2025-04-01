"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  NewShoppingItemType,
  submitNewShoppingItem,
} from "@/app/(auth)/shopping/shoppingActions";
import { toast } from "sonner";
import { categoryList } from "@/app/(auth)/shopping/_components/categoryTypes";
import { useForm } from "@tanstack/react-form";

const NewShoppingItem = () => {
  const form = useForm({
    defaultValues: {
      shoppingItemName: "",
      category: "basic",
    },
  });

  const [newShoppingItemState, newShoppingItemAction] = useActionState(
    submitNewShoppingItem,
    {
      success: false,
      errors: null,
    } as NewShoppingItemType
  );

  useEffect(() => {
    if (!!newShoppingItemState.errors) {
      toast.error("Error to submit new Shopping item.", {
        style: { background: "red" },
      });
    } else if (newShoppingItemState.success) {
      toast.success("New Shopping item added successfully.");
    }
  }, [newShoppingItemState]);

  return (
    <form
      action={newShoppingItemAction}
      className="pb-4"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div className={"flex items-end gap-4"}>
        <form.Field
          name={"shoppingItemName"}
          validators={{
            onChangeAsyncDebounceMs: 500,
            onChangeAsync: ({ value }) =>
              value.length < 3
                ? "Item name must be at least 3 characters long"
                : undefined,
          }}
        >
          {(field) => (
            <div className={"flex flex-col mb-4"}>
              <Label htmlFor={field.name}>Add New item to shopping list</Label>
              <Input
                id={field.name}
                name={field.name}
                type={"text"}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="New shopping item"
              />
              {field.state.meta.errors ? (
                <em role="alert" className={"text-red-500"}>
                  {field.state.meta.errors.join(", ")}
                </em>
              ) : null}
            </div>
          )}
        </form.Field>
        <form.Field
          name={"category"}
          validators={{
            onChange: ({ value }) =>
              categoryList.some((item) => item.name === value)
                ? undefined
                : "Please select a valid category",
          }}
        >
          {(field) => (
            <div className={"mb-4"}>
              <Select
                defaultValue={field.state.value}
                onValueChange={(e) => field.handleChange(e)}
                name={field.name}
              >
                <SelectTrigger className={"w-48"}>
                  <SelectValue placeholder={"Select category:"} />
                </SelectTrigger>
                <SelectContent>
                  {categoryList.map((item) => (
                    <SelectItem key={`category-${item.name}`} value={item.name}>
                      <div className={"flex flex-row items-center gap-4"}>
                        {item.icon}
                        {item.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>
      </div>
      <div className="flex items-center gap-4">
        <Button type={"submit"}>Add</Button>
      </div>
      <ul>
        {newShoppingItemState.errors &&
          Object.keys(newShoppingItemState.errors).map((error) => (
            <li key={`errorShoppingItem-${error}`} className={"text-red-500"}>
              {newShoppingItemState.errors![error]}
            </li>
          ))}
      </ul>
    </form>
  );
};

export default NewShoppingItem;
