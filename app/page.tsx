import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="mb-4 text-4xl font-extrabold">Welcome to TaskMaster</h1>
        <p className="mb-8 text-xl">Your personal task management solution</p>
        <div className="flex space-x-4">
          <SignUpButton mode={"modal"} forceRedirectUrl={"/home"}>
            <Button>Register</Button>
          </SignUpButton>
          <SignInButton mode={"modal"} forceRedirectUrl={"/home"}>
            <Button asChild variant="outline"></Button>
          </SignInButton>
        </div>
      </div>
    </main>
  );
}
