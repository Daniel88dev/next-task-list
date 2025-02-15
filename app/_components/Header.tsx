import { ModeToggle } from "@/components/DarkModeToggle";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Vercel from "./vercel.svg";

const Header = () => {
  return (
    <header className="sticky flex top-0 text-center px-4 h-[5vh] justify-between items-center bg-white dark:bg-black">
      <Link
        href={"/"}
        className={"flex gap-2 text-center items-center text-xl"}
      >
        <Vercel className={"w-8 h-8 dark:fill-white dark:text-white"} />
        TaskMaster
      </Link>
      <div className={"flex gap-4"}>
        <ModeToggle />
        <SignUpButton mode={"modal"} forceRedirectUrl={"/home"}>
          <Button variant="outline" className="w-full sm:w-auto">
            Register
          </Button>
        </SignUpButton>
        <SignInButton mode={"modal"} forceRedirectUrl={"/home"}>
          <Button className="w-full sm:w-auto">Login</Button>
        </SignInButton>
      </div>
    </header>
  );
};

export default Header;
