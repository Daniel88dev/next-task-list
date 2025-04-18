import { currentUser } from "@clerk/nextjs/server";
import DashboardPage from "@/app/(auth)/home/Dashboard";

const HomePage = async () => {
  const user = await currentUser();

  console.log(user?.id);

  return <DashboardPage />;
};

export default HomePage;
