"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ReactNode, useActionState } from "react";
import { Apple, Box, WashingMachine } from "lucide-react";
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

type CategoryType = {
  name: string;
  label: string;
  icon: ReactNode;
};

const NewShoppingItem = () => {
  const categoryList: CategoryType[] = [
    {
      name: "basic",
      label: "Basic",
      icon: <Box />,
    },
    {
      name: "food",
      label: "Food",
      icon: <Apple />,
    },
    {
      name: "electronic",
      label: "Electronic",
      icon: <WashingMachine />,
    },
  ];

  const [newShoppingItemState, newShoppingItemAction] = useActionState(
    submitNewShoppingItem,
    {
      success: false,
      errors: null,
    } as NewShoppingItemType
  );

  console.log(newShoppingItemState);

  return (
    <form action={newShoppingItemAction}>
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
    </form>
  );
};

export default NewShoppingItem;
