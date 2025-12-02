    "use client";

    import { useForm } from "react-hook-form";
    import { zodResolver } from "@hookform/resolvers/zod";
    import * as z from "zod";
    import { Button } from "@/components/ui/button";
    import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
    import { Input } from "@/components/ui/input"; // Assuming you added input component

    const formSchema = z.object({
      // ... your schema from above
      image: z
        .any()
        .refine((file) => !file || file?.size <= 5 * 1024 * 1024, `Max image size is 5MB.`)
        .refine(
          (file) => !file || ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file?.type),
          "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
        .optional(),
    });

    export default function ImageUploadForm() {
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
      });

      const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data);
        // Handle image upload logic here, e.g., send to API or Cloudinary
        if (data.image) {
          const formData = new FormData();
          formData.append("image", data.image);
          // Example: fetch('/api/upload', { method: 'POST', body: formData });
        }
      };

      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      );
    }