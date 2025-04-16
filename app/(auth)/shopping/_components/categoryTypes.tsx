import { ReactNode } from "react";
import { Apple, Box, WashingMachine } from "lucide-react";
import { z } from "zod";

type CategoryType = {
  name: string;
  label: string;
  icon: ReactNode;
};

export const categoryList: CategoryType[] = [
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
    name: "electronics",
    label: "Electronics",
    icon: <WashingMachine />,
  },
];

export const shoppingItemValidator = z.object({
  shoppingItemName: z.string().min(3),
  category: z
    .string()
    .refine((value) => categoryList.some((item) => item.name === value), {
      message: "Invalid category. Choose a valid category name.",
    }),
});
