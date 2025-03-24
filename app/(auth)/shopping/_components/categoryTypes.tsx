import { ReactNode } from "react";
import { Apple, Box, WashingMachine } from "lucide-react";

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
