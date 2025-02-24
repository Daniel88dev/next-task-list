import { usersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";

export type UserDataType = typeof usersTable.$inferInsert;

export const insertUser = async (user: UserDataType) => {
  return db
    .insert(usersTable)
    .values(user)
    .returning({ userId: usersTable.id });
};

export const updateUser = async (
  firstName: string,
  lastName: string,
  email: string,
  clerkId: string
) => {
  return db
    .update(usersTable)
    .set({
      firstName: firstName,
      lastName: lastName,
      email: email,
    })
    .where(eq(usersTable.clerkId, clerkId))
    .returning({ userId: usersTable.id });
};

export const onUserDeleted = (clerkId: string) => {
  return db
    .update(usersTable)
    .set({ isActive: false })
    .where(eq(usersTable.clerkId, clerkId))
    .returning({ userId: usersTable.id });
};
