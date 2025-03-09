"use server";

import { getUserId } from "@/drizzle/user";
import { getSingleTask } from "@/drizzle/taskTable";
import EditTaskDescription from "@/app/(auth)/tasks/[taskId]/comment/EditTaskDescription";

const EditTaskPage = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const { taskId } = await params;
  const userId = await getUserId();

  const taskData = await getSingleTask(taskId, userId);

  if (taskData.length === 0) {
    return <h1>Task not found</h1>;
  }

  return <EditTaskDescription task={taskData[0]} />;
};

export default EditTaskPage;
