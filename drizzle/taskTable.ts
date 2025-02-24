import { taskTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";

export type TaskTableType = typeof taskTable.$inferInsert;

export const insertNewTask = async (task: TaskTableType) => {
  return db.insert(taskTable).values(task).returning({ taskId: taskTable.id });
};

export const getSingleTask = async (taskId: number, userId: number) => {
  return db
    .select()
    .from(taskTable)
    .where(and(eq(taskTable.id, taskId), eq(taskTable.userId, userId)));
};

export const getTasksForUser = async (userId: number) => {
  return db.select().from(taskTable).where(eq(taskTable.userId, userId));
};
