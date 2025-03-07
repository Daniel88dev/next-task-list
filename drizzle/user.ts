import { usersTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { eq, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

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

export const getUserId = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser || !clerkUser.id) {
    throw new Error("Clerk user not found or missing ID");
  }
  const user = await db.query.usersTable.findFirst({
    where: eq(usersTable.clerkId, clerkUser.id),
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user.id;
};

export const increaseUserTaskId = async (userId: number) => {
  return db
    .update(usersTable)
    .set({
      lastTask: sql`${usersTable.lastTask} + 1`,
    })
    .where(eq(usersTable.id, userId))
    .returning({ currentTask: usersTable.lastTask });
};
