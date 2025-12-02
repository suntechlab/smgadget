import { z } from "zod";
const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
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

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  status: z.enum(["published", "draft", "archived"]),
  thumbnail: z.instanceof(File, { message: "Image is required." })
    .refine((file) => file.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
  categories: z.array(
    z.object({
      name: z.string()
    })
  ).min(1, "Category is required"),
  brands: z.array(
    z.object({
      name: z.string()
    })
  ).min(1, "Brand is required"),
  tags: z.array(z.string()),
  variations: z.array(
    z.object({
      type: z.string(),
      value: z.string()
    })
  ),
  basePrice: z.string().min(1, "Base price is required"),
  discountType: z.enum(["none", "percentage", "fixed"]),
  template: z.enum(["default", "minimal", "detailed"]),
  taxClass: z.enum(["standard", "reduced", "zero"]),
  vatAmount: z.string().min(1, "VAT amount is required")
});

export type ProductFormData = z.infer<typeof productFormSchema>;