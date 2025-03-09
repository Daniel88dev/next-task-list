"use server";

import { getUserId } from "@/drizzle/user";
import { completeTask, updateTaskDescription } from "@/drizzle/taskTable";
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

export type SubmitEditTaskCommentStateType = {
  taskId: number;
  success: boolean;
  errors: null | {
    [key: string]: string | undefined;
  };
};

export const editTaskComment = async (
  prevState: SubmitEditTaskCommentStateType,
  formData: FormData
): Promise<SubmitEditTaskCommentStateType> => {
  const description = formData.get("description") as string;

  const errors: {
    success?: string;
  } = {};

  const userId = await getUserId();

  const updatedTask = await updateTaskDescription(
    prevState.taskId,
    userId,
    description
  );

  if (updatedTask[0].taskId !== prevState.taskId) {
    errors.success = "Server error";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ...prevState,
      success: false,
      errors,
    };
  }

  revalidatePath("/tasks");
  return {
    ...prevState,
    success: true,
  };
};
