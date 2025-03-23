"use server";

import { tryCatch } from "@/lib/try-catch";
import { getUserId } from "@/drizzle/user";
import {
  insertToShoppingList,
  ShoppingListInsertType,
} from "@/drizzle/shoppingList";
import { revalidatePath } from "next/cache";

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

  const errors: {
    user?: string;
    title?: string;
    category?: string;
    server?: string;
  } = {};

  const { data: userId, error: userError } = await tryCatch(getUserId());

  if (userError) {
    console.error(userError);
    errors.user = "User not found";
  }

  if (
    !shoppingItemName ||
    shoppingItemName.length < 1 ||
    shoppingItemName.length > 50
  ) {
    console.error("Shopping Title Error");
    errors.title = "Shopping item name must be between 1 and 50 characters";
  }

  if (
    !category ||
    (category !== "basic" && category !== "food" && category !== "electronics")
  ) {
    console.error("Category Error");
    errors.category =
      "Category must be one of the following: basic, food, electronics";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ...prevState,
      success: false,
      errors,
    };
  }

  const shoppingItemData: ShoppingListInsertType = {
    userId: userId!,
    category: category,
    title: shoppingItemName,
  };

  const { data: result, error: dbError } = await tryCatch(
    insertToShoppingList(shoppingItemData)
  );

  if (dbError || !result || isNaN(result[0].id)) {
    console.error(dbError);
    errors.server = "Server error";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ...prevState,
      success: false,
      errors,
    };
  }

  revalidatePath("/shopping");

  return {
    ...prevState,
    success: true,
    errors: null,
  };
};
