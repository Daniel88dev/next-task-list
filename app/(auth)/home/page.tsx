import { currentUser } from "@clerk/nextjs/server";
import NewTaskDialog from "@/components/newTaskComponent/NewTaskDialog";

const HomePage = async () => {
  const user = await currentUser();

  return (
    <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
      <h1 className="mb-4 text-4xl font-extrabold">
        Welcome to TaskMaster {user?.firstName ?? ""}
      </h1>
      <p>Task overview</p>
      <NewTaskDialog type={"NEW"} taskButton={"Create new task"} />
    </div>
  );
};

export default HomePage;
