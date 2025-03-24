import { shoppingListTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { and, count, eq } from "drizzle-orm";

export type ShoppingListInsertType = typeof shoppingListTable.$inferInsert;

export type ShoppingListItemType = typeof shoppingListTable.$inferSelect;

export const insertToShoppingList = async (
  shoppingItem: ShoppingListInsertType
) => {
  return db
    .insert(shoppingListTable)
    .values(shoppingItem)
    .returning({ id: shoppingListTable.id });
};

export const getShoppingListForUser = async (
  userId: number
): Promise<ShoppingListItemType[]> => {
  return db
    .select()
    .from(shoppingListTable)
    .where(eq(shoppingListTable.userId, userId));
};

export const getShoppingListQtyForUser = async (userId: number) => {
  return db
    .select({ count: count() })
    .from(shoppingListTable)
    .where(
      and(
        eq(shoppingListTable.userId, userId),
        eq(shoppingListTable.isOpen, true)
      )
    );
};

export const putPurchaseShoppingItem = async (
  shoppingItemId: number,
  userId: number
) => {
  return db
    .update(shoppingListTable)
    .set({ isOpen: false, completedAt: new Date() })
    .where(
      and(
        eq(shoppingListTable.id, shoppingItemId),
        eq(shoppingListTable.userId, userId)
      )
    )
    .returning({ updatedId: shoppingListTable.id });
};
