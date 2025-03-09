"use server";

import { getUserId } from "@/drizzle/user";
import { completeTask } from "@/drizzle/taskTable";
import { revalidatePath } from "next/cache";

export const finishTask = async (taskId: number) => {
  const userId = await getUserId();

  const updatedTask = await completeTask(taskId, userId);

  if (updatedTask[0].taskId !== taskId) {
    return false;
  }

  revalidatePath("/tasks");
  return true;
};
