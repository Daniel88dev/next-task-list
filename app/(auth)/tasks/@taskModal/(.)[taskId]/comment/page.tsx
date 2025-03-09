"use server";

import { getUserId } from "@/drizzle/user";
import { getSingleTask } from "@/drizzle/taskTable";
import EditTaskDescriptionDialog from "@/app/(auth)/tasks/[taskId]/comment/EditTaskDescriptionDialog";

const TaskCommentInterceptedPage = async ({
  params,
}: {
  params: Promise<{ taskId: string }>;
}) => {
  const { taskId } = await params;
  const userId = await getUserId();

  const taskData = await getSingleTask(taskId, userId);

  if (taskData.length === 0) {
    throw new Error("Task not found");
  }

  return <EditTaskDescriptionDialog task={taskData[0]} />;
};

export default TaskCommentInterceptedPage;
