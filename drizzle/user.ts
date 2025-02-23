import { usersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";

export type UserDataType = typeof usersTable.$inferInsert;

export const insertUser = async (user: UserDataType) => {
  return db
    .insert(usersTable)
    .values(user)
    .returning({ userId: usersTable.id });
};
