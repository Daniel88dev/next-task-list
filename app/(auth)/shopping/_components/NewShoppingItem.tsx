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
import { mergeForm, useForm, useTransform } from "@tanstack/react-form";
import { Card } from "@/components/ui/card";

const NewShoppingItem = () => {
  const [newShoppingItemState, newShoppingItemAction, isPending] =
    useActionState(submitNewShoppingItem, {
      success: false,
      errors: [],
    } as NewShoppingItemType);

  const form = useForm({
    defaultValues: {
      shoppingItemName: "",
      category: "basic",
    },
    transform: useTransform(
      (baseForm) => mergeForm(baseForm, newShoppingItemState ?? {}),
      [newShoppingItemState]
    ),
  });

  useEffect(() => {
    if (newShoppingItemState.errors.length > 0) {
      toast.error("Error to submit new Shopping item.", {
        style: { background: "red" },
      });
    } else if (newShoppingItemState.success) {
      form.reset();
      toast.success("New Shopping item added successfully.");
    }
  }, [newShoppingItemState]);

  return (
    <form
      action={newShoppingItemAction}
      className="pb-4"
      onSubmit={async (e) => {
        await form.handleSubmit(e);
      }}
    >
      <Card className={"flex items-end gap-4 content-start w-full"}>
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
            <div className={"flex flex-col mb-4 h-24 min-w-84 w-auto w-84 p-2"}>
              <Label htmlFor={field.name}>Add New item to shopping list:</Label>
              <Input
                id={field.name}
                name={field.name}
                type={"text"}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="New shopping item"
                className={"w-80"}
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
            <div className={"flex flex-col mb-4 h-24 p-2"}>
              <Label htmlFor={field.name}>Type:</Label>
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
        <div className={"flex flex-col h-24 content-start pt-2"}>
          <Button type={"submit"} className={"h-8"} disabled={isPending}>
            Add
          </Button>
        </div>
      </Card>

      <ul>
        {newShoppingItemState.errors.length > 0 &&
          newShoppingItemState.errors.map((error) => (
            <li key={`errorShoppingItem-${error}`} className={"text-red-500"}>
              {error}
            </li>
          ))}
      </ul>
    </form>
  );
};

export default NewShoppingItem;
