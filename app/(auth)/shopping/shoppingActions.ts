"use server";

export type NewShoppingItemType = {
  success: boolean;
  errors: null | {
    [key: string]: string | undefined;
  };
};

export const submitNewShoppingItem = async (
  prevState: NewShoppingItemType,
  formData: FormData
) => {
  const shoppingItemName = formData.get("shoppingItemName") as string;
  const category = formData.get("category") as string;

  console.table({ shoppingItemName, category });

  return {
    ...prevState,
    success: true,
  };
};
