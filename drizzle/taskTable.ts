import { taskTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { and, eq } from "drizzle-orm";

export type TaskTableInsertType = typeof taskTable.$inferInsert;

export type TaskTableType = typeof taskTable.$inferSelect;

export const insertNewTask = async (task: TaskTableInsertType) => {
  return db.insert(taskTable).values(task).returning({ taskId: taskTable.id });
};

export const updateTask = async (
  task: TaskTableInsertType
): Promise<{ taskId: number; taskUserId: string | null }> => {
  const update = await db
    .update(taskTable)
    .set(task)
    .where(eq(taskTable.taskUserId, task.taskUserId!))
    .returning({ taskId: taskTable.id, taskUserId: taskTable.taskUserId });

  return update[0];
};

export const getSingleTask = async (
  taskUserId: string,
  userId: number
): Promise<TaskTableType[]> => {
  return db
    .select()
    .from(taskTable)
    .where(
      and(eq(taskTable.taskUserId, taskUserId), eq(taskTable.userId, userId))
    );
};

export const getTasksForUser = async (
  userId: number
): Promise<TaskTableType[]> => {
  return db.select().from(taskTable).where(eq(taskTable.userId, userId));
};

export const completeTask = async (taskId: number, userId: number) => {
  return db
    .update(taskTable)
    .set({ status: "completed", completedAt: new Date() })
    .where(and(eq(taskTable.id, taskId), eq(taskTable.userId, userId)))
    .returning({ taskId: taskTable.id });
};

export const updateTaskDescription = async (
  taskId: number,
  userId: number,
  description: string
) => {
  return db
    .update(taskTable)
    .set({ description: description })
    .where(and(eq(taskTable.id, taskId), eq(taskTable.userId, userId)))
    .returning({ taskId: taskTable.id });
};
