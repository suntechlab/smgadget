"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
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
import { createUser } from "@/actions/users";
import { toast } from "sonner";
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be no more than 50 characters long" }),
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
    cpassword: z
      .string()
      .min(8, {
        message: "Confirm password must be at least 8 characters long",
      })
      .max(30, {
        message: "Confirm password must be no more than 30 characters long",
      })
      .regex(/[A-Z]/, {
        message: "Confirm password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Confirm password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, {
        message: "Confirm password must contain at least one number",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Confirm password must contain at least one special character",
      }),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords don't match",
    path: ["cpassword"],
  });

export function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpassword: "",
    },
  });

  return (
    <Form {...form}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-muted-foreground text-balance">
            Enter your information below to create your account
          </p>
        </div>
        <form
          onSubmit={form.handleSubmit(async (data) => {
            const res = await createUser({
              name: data.name,
              email: data.email,
              password: data.password,
            });
            if (res.success == false) {
              form.setError("email", { type: "custom", message: res.message });
            }
            if (res.success == true) {
              toast.success(res.message);
              form.reset()
            }
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} />
                </FormControl>
                <FormDescription>This is your name.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <div className="grid grid-cols-2 gap-4">
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
            <FormField
              control={form.control}
              name="cpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Confirm password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Field>
            <Button type="submit" size={"lg"}>
              Sign Up
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
          Already have an account? <Link href="/signin">Sign in</Link>
        </FieldDescription>
      </FieldGroup>
    </Form>
  );
}
