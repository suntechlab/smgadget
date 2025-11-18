import { LoginForm } from "@/components/Login"
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function LoginPage() {
  const session = await auth();
  if(session) redirect('/')
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <LoginForm />
      </div>
    </div>
  )
}
