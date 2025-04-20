import { taskTable } from "@/drizzle/schema";
import { db } from "@/drizzle/db";
import { and, count, desc, eq, or, sql } from "drizzle-orm";

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

export type SimpleTaskType = {
  id: number;
  title: string;
  completed: boolean;
  type: string;
};

export const getTop10TasksForUser = async (
  userId: number
): Promise<SimpleTaskType[]> => {
  return db
    .select({
      id: taskTable.id,
      title: taskTable.title,
      completed:
        sql<boolean>`CASE WHEN ${taskTable.completedAt} IS NOT NULL THEN true ELSE false END`.as(
          "completed"
        ),
      type: taskTable.type,
    })
    .from(taskTable)
    .where(
      and(
        eq(taskTable.userId, userId),
        or(eq(taskTable.status, "todo"), eq(taskTable.status, "in_progress"))
      )
    )
    .orderBy(desc(taskTable.priority), desc(taskTable.id))
    .limit(10);
};

export const countTasksForUser = async (userId: number) => {
  return db
    .select({ count: count() })
    .from(taskTable)
    .where(
      and(
        eq(taskTable.userId, userId),
        or(eq(taskTable.status, "todo"), eq(taskTable.status, "in_progress"))
      )
    );
};

export type TaskChartDataType = {
  name: string;
  total: number;
};

export const taskChartDataForUser = async (
  userId: number
): Promise<TaskChartDataType[]> => {
  const data = await db
    .select({
      name: sql`TO_CHAR(DATE_TRUNC('month', ${taskTable.completedAt}), 'Mon')`,
      total: sql`COUNT(*)`,
    })
    .from(taskTable)
    .where(
      and(
        sql`${taskTable.completedAt} IS NOT NULL AND ${taskTable.completedAt} >= NOW() - INTERVAL '6 months'`,
        eq(taskTable.userId, userId)
      )
    )
    .groupBy(sql`DATE_TRUNC('month', ${taskTable.completedAt})`)
    .orderBy(sql`DATE_TRUNC('month', ${taskTable.completedAt})`);

  return data.map((record) => {
    return {
      name: record.name as string,
      total: +record.total!,
    };
  });
};
