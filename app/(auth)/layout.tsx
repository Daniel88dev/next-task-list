import { ReactNode } from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";
import AuthHeader from "@/app/(auth)/_components/AuthHeader";

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <SignedIn>
      <AuthHeader />
      <div className="min-h-[90%] flex flex-col items-center justify-center p-4">
        <main className="max-w-4xl w-full rounded-lg shadow-xl p-8 space-y-8">
          {children}
        </main>
      </div>
    </SignedIn>
  );
}
