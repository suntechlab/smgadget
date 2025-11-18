import { SignupForm } from "@/components/SignUp"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function SignupPage() {
    const session = await auth();
  if(session) redirect('/')
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <SignupForm />
      </div>
    </div>
  )
}