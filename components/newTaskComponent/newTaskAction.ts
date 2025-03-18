"use server";

import {
  insertNewTask,
  TaskTableInsertType,
  updateTask,
} from "@/drizzle/taskTable";
import { getUserId, increaseUserTaskId } from "@/drizzle/user";
import { formatTaskId } from "@/components/newTaskComponent/taskIdHelper";

export type NewTaskActionType = {
  type: "NEW";
  success: boolean;
  taskId: string | null;
  errors: null | {
    [key: string]: string | undefined;
  };
};

export const submitNewTask = async (
  prevState: NewTaskActionType,
  formData: FormData
) => {
  try {
    const taskTitle = formData.get("taskTitle") as string;
    const taskDescription = formData.get("taskDescription") as string | null;
    const priority = formData.get("priority") as string;
    const status = formData.get("status") as string;
    const dueDate = formData.get("targetDate") as string;

    const userId = await getUserId();

    const targetDate: Date | null =
      !dueDate || dueDate === "none" ? null : new Date(dueDate);

    const errors: {
      taskTitle?: string;
      priority?: string;
      status?: string;
      user?: string;
      server?: string;
    } = {};

    if (!userId) {
      errors.user = "User not found";
    }

    if (!taskTitle || taskTitle.length < 5 || taskTitle.length > 50) {
      errors.taskTitle = "Task title must be between 5 and 50 characters";
    }

    if (
      !priority ||
      (priority !== "low" &&
        priority !== "medium" &&
        priority !== "high" &&
        priority !== "urgent")
    ) {
      errors.priority =
        "Priority must be one of the following: low, medium, high, urgent";
    }

    if (!status || (status !== "todo" && status !== "in_progress")) {
      errors.status =
        "Status must be set to one of the following: To Do, In Progress";
    }

    if (Object.keys(errors).length > 0) {
      return {
        ...prevState,
        errors,
      };
    }

    if (prevState.type === "NEW") {
      const getTaskId = await increaseUserTaskId(userId);

      if (!getTaskId[0].currentTask || isNaN(getTaskId[0].currentTask)) {
        errors.server = "Server error";
      }

      if (Object.keys(errors).length > 0) {
        return {
          ...prevState,
          errors,
        };
      }

      const taskIdString = formatTaskId(userId, getTaskId[0].currentTask!);

      const task: TaskTableInsertType = {
        title: taskTitle,
        description: taskDescription,
        type: "task",
        priority: priority as "low" | "medium" | "high" | "urgent",
        status: status as "todo" | "in_progress",
        dueDate: targetDate,
        userId: userId,
        taskUserId: taskIdString,
      };

      const insertTask = await insertNewTask(task);

      if (!insertTask) {
        errors.server = "Server error";
      }

      if (Object.keys(errors).length > 0) {
        return {
          ...prevState,
          errors,
        };
      }
    } else if (prevState.type === "EDIT" && prevState.taskId !== null) {
      const taskIdString = prevState.taskId;

      const task: TaskTableInsertType = {
        title: taskTitle,
        description: taskDescription,
        type: "task",
        priority: priority as "low" | "medium" | "high" | "urgent",
        status: status as "todo" | "in_progress",
        dueDate: targetDate,
        userId: userId,
        taskUserId: taskIdString,
      };

      console.log(task);

      const updating = await updateTask(task);

      if (
        !updating ||
        !updating.taskUserId ||
        prevState.taskId !== updating.taskUserId
      ) {
        errors.server = "Server error";
      }

      if (Object.keys(errors).length > 0) {
        return {
          ...prevState,
          errors,
        };
      }
    }

    return {
      ...prevState,
      success: true,
    };
  } catch (error) {
    console.log(error);
    return { ...prevState, errors: { server: "Server error" } };
  }
};
