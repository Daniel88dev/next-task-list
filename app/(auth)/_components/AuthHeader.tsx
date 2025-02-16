import Link from "next/link";
import Logo from "../../_components/vercel.svg";
import { ModeToggle } from "@/components/DarkModeToggle";
import { UserButton } from "@clerk/nextjs";

const AuthHeader = () => {
  return (
    <header className="sticky flex top-0 text-center px-4 h-[5vh] justify-between items-center bg-white dark:bg-black">
      <Link
        href={"/home"}
        className={"flex gap-2 text-center items-center text-xl"}
      >
        <Logo className={"w-8 h-8 dark:fill-white dark:text-white"} />
        TaskMaster
      </Link>
      <div className={"flex gap-4"}>
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
};

export default AuthHeader;
