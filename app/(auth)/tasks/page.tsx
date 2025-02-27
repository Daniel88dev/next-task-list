"use server";

import { getUserId } from "@/drizzle/user";
import { getTasksForUser } from "@/drizzle/taskTable";
import TaskTable from "@/components/TaskTableComponents/TaskTable";

const TasksPage = async () => {
  const userId = await getUserId();

  const userTasks = await getTasksForUser(userId);

  return <TaskTable tasks={userTasks} />;
};

export default TasksPage;
