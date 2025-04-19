import { currentUser } from "@clerk/nextjs/server";
import DashboardPage from "@/app/(auth)/home/Dashboard";
import { notFound, redirect } from "next/navigation";
import { tryCatch } from "@/lib/try-catch";
import { countTasksForUser, getTop10TasksForUser } from "@/drizzle/taskTable";
import { getUserId } from "@/drizzle/user";

const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const { data: userId, error: userError } = await tryCatch(getUserId());

  if (userError) {
    console.error(userError);
    notFound();
  }

  const { data: userTasks, error: tasksError } = await tryCatch(
    getTop10TasksForUser(userId)
  );

  if (tasksError) {
    console.error(tasksError);
    notFound();
  }

  const { data: taskCount, error: taskCountError } = await tryCatch(
    countTasksForUser(userId)
  );

  if (taskCountError) {
    console.error(taskCountError);
    notFound();
  }

  return (
    <DashboardPage
      firstName={user.firstName!}
      userTasks={userTasks}
      userTaskCount={taskCount[0].count ? taskCount[0].count : 0}
    />
  );
};

export default HomePage;
