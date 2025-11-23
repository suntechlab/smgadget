"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "./ui/field";
import Link from "next/link";
import { FaApple, FaGoogle, FaMeta } from "react-icons/fa6";
import { loginUser } from "@/actions/users";
import { toast } from "sonner";
const formSchema = z.object({
  email: z.email({ message: "Enter valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(30, { message: "Password must be no more than 30 characters long" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^A-Za-z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    signIn("credentials", values);
  }

  return (
    <Form {...form}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground text-balance">
            Sign in to your account
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            const res = await loginUser(data);
            if (res.success == false && res.emailError) {
              form.setError("email", {
                type: "custom",
                message: res.emailError,
              });
            }
            if (res.success == false && res.passwordError) {
              form.setError("password", {
                type: "custom",
                message: res.passwordError,
              });
            }
            if (res.success == true) {
              toast.success(res.message);
            }
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormDescription>This is your email address.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>This is your password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Field>
            <Button type="submit" size={"lg"}>
              Sign In
            </Button>
          </Field>
        </form>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field className="grid grid-cols-3 gap-4">
          <Button variant="outline" size={"lg"}>
            <FaApple />
          </Button>
          <Button
            variant="outline"
            size={"lg"}
            onClick={() => signIn("google")}
          >
            <FaGoogle />
          </Button>
          <Button variant="outline" size={"lg"}>
            <FaMeta />
          </Button>
        </Field>
        <FieldDescription className="text-center">
          Don&apos;t have an account? <Link href="/signup">Sign up</Link>
        </FieldDescription>
      </FieldGroup>
    </Form>
  );
}
