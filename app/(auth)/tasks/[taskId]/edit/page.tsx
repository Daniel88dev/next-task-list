"use server";

import { getUserId } from "@/drizzle/user";
import { getSingleTask } from "@/drizzle/taskTable";
import NewTaskDialog from "@/components/newTaskComponent/NewTaskDialog";

const EditTaskPage = async ({
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

  return <NewTaskDialog type={"EDIT"} taskButton={""} taskData={taskData[0]} />;
};

export default EditTaskPage;
