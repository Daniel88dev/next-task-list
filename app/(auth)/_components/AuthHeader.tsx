import Link from "next/link";
import { ModeToggle } from "@/components/DarkModeToggle";
import { UserButton } from "@clerk/nextjs";
import { Navigation } from "@/app/(auth)/_components/Navigation";
import { BookCheck } from "lucide-react";

const AuthHeader = () => {
  return (
    <header className="sticky flex top-0 text-center px-4 h-[5vh] justify-between items-center bg-white dark:bg-black">
      <Link
        href={"/home"}
        className={"flex gap-2 text-center items-center text-xl"}
      >
        <BookCheck size={40} />
        Task Master
      </Link>
      <Navigation />
      <div className={"flex gap-4"}>
        <ModeToggle />
        <UserButton />
      </div>
    </header>
  );
};

export default AuthHeader;
