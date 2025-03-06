"use server";

import { getUserId } from "@/drizzle/user";
import { getSingleTask } from "@/drizzle/taskTable";

const EditTaskPage = async ({
  params,
}: {
  params: Promise<{ taskId: number }>;
}) => {
  const { taskId } = await params;
  const userId = await getUserId();

  const taskData = await getSingleTask(taskId, userId);

  if (taskData.length === 0) {
    return <h1>Task not found</h1>;
  }

  return <h1>{taskData[0].title}</h1>;
};

export default EditTaskPage;
