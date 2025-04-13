"use server";

import { tryCatch } from "@/lib/try-catch";
import { getUserId } from "@/drizzle/user";
import {
  insertToShoppingList,
  putPurchaseShoppingItem,
  ShoppingListInsertType,
} from "@/drizzle/shoppingList";
import { revalidatePath } from "next/cache";

export type NewShoppingItemType = {
  success: boolean;
  errors: string[];
};

export const submitNewShoppingItem = async (
  prevState: NewShoppingItemType,
  formData: FormData
) => {
  const shoppingItemName = formData.get("shoppingItemName") as string;
  const category = formData.get("category") as string;

  const errors: string[] = [];

  const { data: userId, error: userError } = await tryCatch(getUserId());

  if (userError) {
    console.error(userError);
    errors.push("User not found");
  }

  if (
    !shoppingItemName ||
    shoppingItemName.length < 1 ||
    shoppingItemName.length > 50
  ) {
    console.error("Shopping Title Error");
    errors.push("Shopping item name must be between 1 and 50 characters");
  }

  if (
    !category ||
    (category !== "basic" && category !== "food" && category !== "electronics")
  ) {
    console.error("Category Error");
    errors.push(
      "Category must be one of the following: basic, food, electronics"
    );
  }

  if (errors.length > 0) {
    return {
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
    errors.push("Server error");
  }

  if (errors.length > 0) {
    return {
      success: false,
      errors,
    };
  }

  revalidatePath("/shopping");

  return {
    success: true,
    errors: [],
  };
};

export const onPurchaseShoppingItem = async (shoppingItemId: number) => {
  const { data: userId, error: userError } = await tryCatch(getUserId());

  if (userError) {
    console.error(userError);
    return { success: false, message: "User not found" };
  }

  const { data: updatedRecord, error: dbError } = await tryCatch(
    putPurchaseShoppingItem(shoppingItemId, userId)
  );

  if (dbError || updatedRecord[0].updatedId !== shoppingItemId) {
    console.error(dbError);
    return { success: false, message: "Server error" };
  }

  revalidatePath("/shopping");

  return { success: true, message: "Item successfully purchased" };
};
