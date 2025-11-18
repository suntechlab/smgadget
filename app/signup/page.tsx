import { SignupForm } from "@/components/SignUp"

export default function SignupPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-sm md:max-w-xl">
        <SignupForm />
      </div>
    </div>
  )
}