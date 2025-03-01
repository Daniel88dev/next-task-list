"use server";

import { getUserId } from "@/drizzle/user";
import { getTasksForUser } from "@/drizzle/taskTable";
import { TaskDataTable } from "@/components/TaskTableComponents/TaskDataTable";
import { taskTableColumns } from "@/components/TaskTableComponents/TaskTableColumns";

const TasksPage = async () => {
  const userId = await getUserId();

  const userTasks = await getTasksForUser(userId);

  return (
    <div className="container mx-auto py-10">
      <TaskDataTable columns={taskTableColumns} data={userTasks} />
    </div>
  );
};

export default TasksPage;
