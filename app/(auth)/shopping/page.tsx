"use server";

import { getUserId } from "@/drizzle/user";
import { tryCatch } from "@/lib/try-catch";
import { getShoppingListForUser } from "@/drizzle/shoppingList";
import { notFound } from "next/navigation";
import NewShoppingItem from "@/app/(auth)/shopping/_components/NewShoppingItem";
import { ShoppingDataTable } from "@/components/ShoppingTableComponents/ShoppingDataTable";
import { shoppingTableColumns } from "@/components/ShoppingTableComponents/ShoppingTableColumns";

const ShoppingPage = async () => {
  const { data: userId, error: userError } = await tryCatch(getUserId());

  if (userError) {
    notFound();
  }

  const { data: shoppingList, error: shoppingListError } = await tryCatch(
    getShoppingListForUser(userId)
  );

  if (shoppingListError) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <NewShoppingItem />
      <ShoppingDataTable columns={shoppingTableColumns} data={shoppingList} />
    </div>
  );
};

export default ShoppingPage;
