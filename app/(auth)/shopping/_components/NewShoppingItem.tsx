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

const NewShoppingItem = () => {
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
    <form action={newShoppingItemAction} className="pb-4">
      <Label>Add New item to shopping list</Label>
      <div className="flex items-center gap-4">
        <Input
          id="shoppingItemName"
          name="shoppingItemName"
          placeholder="New shopping item"
        />
        <Select defaultValue={"basic"} name={"category"}>
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
