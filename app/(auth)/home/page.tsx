import { currentUser } from "@clerk/nextjs/server";
import DashboardPage from "@/app/(auth)/home/_components/Dashboard";
import { notFound, redirect } from "next/navigation";
import { tryCatch } from "@/lib/try-catch";
import { countTasksForUser, getTop10TasksForUser } from "@/drizzle/taskTable";
import { getUserId } from "@/drizzle/user";
import {
  getShoppingListQtyForUser,
  getTop10ShoppingItemsForUser,
} from "@/drizzle/shoppingList";

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

  const { data: userShoppingItems, error: shoppingError } = await tryCatch(
    getTop10ShoppingItemsForUser(userId)
  );

  if (shoppingError) {
    console.error(shoppingError);
    notFound();
  }

  const { data: shoppingQty, error: shoppingQtyError } = await tryCatch(
    getShoppingListQtyForUser(userId)
  );

  if (shoppingQtyError) {
    console.error(shoppingQtyError);
    notFound();
  }

  return (
    <DashboardPage
      firstName={user.firstName!}
      userTasks={userTasks}
      userTaskCount={taskCount[0].count}
      userShoppingCount={shoppingQty[0].count}
      userShoppingItems={userShoppingItems}
    />
  );
};

export default HomePage;
