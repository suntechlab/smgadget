import { z } from "zod";

export const formSchema = z
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