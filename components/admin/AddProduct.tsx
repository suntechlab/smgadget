"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { productFormSchema, type ProductFormData } from "@/lib/zod";
import { PlusIcon, XIcon } from "lucide-react";
import { createProduct } from "@/actions/products";

export function AddProduct() {
  // const [categories, setCategories] = useState<string[]>(["Headphones"]);
  const [newCategory, setNewCategory] = useState("");
  // const [variations, setVariations] = useState<
  //   Array<{ type: string; value: string }>
  // >([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "T shirt",
      description: "This is description",
      status: "published",
      categories: [],
      tags: ["#t-shirt"],
      variations: [],
      basePrice: "100",
      discountType: "none",
      template: "default",
      taxClass: "standard",
      vatAmount: "25",
    },
  });
  const {
    fields: categoryField,
    append: categoryAppend,
    remove: categoryRemove,
  } = useFieldArray({
    control: form.control,
    name: "categories",
  });
  const {
    fields: variationField,
    append: variationAppend,
    remove: variationRemove,
  } = useFieldArray({
    control: form.control,
    name: "variations",
  });
  const onSubmit = (data: ProductFormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
  };

  return (
    <Form {...form}>
      <div className="space-y-8 px-4">
        <form onSubmit={form.handleSubmit((data)=> createProduct(data))} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Left Column - Main Content */}
            <div className="space-y-4 lg:col-span-2">
              {/* General Section */}
              <Card>
                <CardHeader>
                  <CardTitle>General</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
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
                    name="description"
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
                </CardContent>
              </Card>

              {/* Media Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 p-12 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center text-2xl text-purple-400">
                      📁
                    </div>
                    <FormField
                      control={form.control}
                      name="thumbnail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              onChange={(e) =>
                                field.onChange(e.target.files?.[0])
                              }
                            />
                          </FormControl>
                          <FormDescription>This is your name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <p className="text-purple-600">Drop files here to upload</p>
                  </div>
                </CardContent>
              </Card>

              {/* Variation Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Variation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Label>Add Product Variations</Label>
                    {variationField.map((variation, index) => (
                      <div
                        key={variation.id}
                        className="flex items-center gap-2"
                      >
                        <FormField
                          control={form.control}
                          name={`variations.${index}.type`} // Dynamic name for each item's name
                          render={({ field }) => (
                            <Select
                              defaultValue={variation.type}
                              onValueChange={field.onChange}
                              {...field}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Size">Size</SelectItem>
                                <SelectItem value="Color">Color</SelectItem>
                                <SelectItem value="Material">
                                  Material
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`variations.${index}.value`} // Dynamic name for each item's quantity
                          render={({ field }) => (
                            <Input
                              placeholder="Variation"
                              {...field}
                              className="flex-1"
                            />
                          )}
                        />{" "}
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => variationRemove(index)}
                        >
                          <XIcon />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        variationAppend({ type: "Size", value: "" })
                      }
                    >
                      <PlusIcon /> Add another variation
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="basePrice"
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
                  <FieldSet>
                    <FieldLabel>Discount Type</FieldLabel>
                    <FieldDescription>
                      Yearly and lifetime plans offer significant savings.
                    </FieldDescription>
                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <Field orientation="horizontal">
                            <RadioGroupItem value="none" id="no-discount" />
                            <FieldLabel
                              htmlFor="no-discount"
                              className="font-normal"
                            >
                              No Discount
                            </FieldLabel>
                          </Field>
                          <Field orientation="horizontal">
                            <RadioGroupItem
                              value="percentage"
                              id="percentage"
                            />
                            <FieldLabel
                              htmlFor="percentage"
                              className="font-normal"
                            >
                              Percentage %
                            </FieldLabel>
                          </Field>
                          <Field orientation="horizontal">
                            <RadioGroupItem value="fixed" id="fixed-price" />
                            <FieldLabel
                              htmlFor="fixed-price"
                              className="font-normal"
                            >
                              Fixed Price
                            </FieldLabel>
                          </Field>
                        </RadioGroup>
                      )}
                    />
                  </FieldSet>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="taxClass">
                        Tax Class <span className="text-red-500">*</span>
                      </Label>
                      <FormField
                        control={form.control}
                        name="taxClass"
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} {...field}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="reduced">Reduced</SelectItem>
                              <SelectItem value="zero">Zero Rate</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />

                      <p className="text-muted-foreground text-sm">
                        Set the product tax class.
                      </p>
                    </div>

                    <FormField
                      control={form.control}
                      name="vatAmount"
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
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-4">
              {/* Thumbnail Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Thumbnail</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg border-2 border-dashed border-purple-300 bg-purple-50 p-8 text-center">
                    <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center text-xl text-purple-400">
                      🖼️
                    </div>
                    <p className="text-sm text-purple-600">
                      Drop Thumbnail here to upload
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-2 text-xs">
                    Set the product thumbnail image. Only *.png, *.jpg and
                    *.jpeg image files are accepted.
                  </p>
                </CardContent>
              </Card>

              {/* Status Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Status
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  </CardTitle>
                  <CardDescription>Set the product status.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        {...field}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="published">Published</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </CardContent>
              </Card>
              {/* Product Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium">Categories</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {categoryField.map((category, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-purple-100 text-purple-700"
                        >
                          <span
                            className="mr-1 cursor-pointer"
                            onClick={() => categoryRemove(index)}
                          >
                            ×
                          </span>
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Add product to a category.
                    </p>
                    <div className="mt-2 flex gap-2">
                      <Input
                        placeholder="New category"
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => categoryAppend({ name: newCategory })}
                      >
                        <PlusIcon /> Create New Category
                      </Button>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <Label className="text-sm font-medium">Tags</Label>
                    <p className="text-muted-foreground mt-1 text-xs">
                      Add product to a category.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Product Template</CardTitle>
                  <CardDescription>
                    Assign a template from your current theme to define how a
                    single product is displayed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="template"
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="default">
                              Default Template
                            </SelectItem>
                            <SelectItem value="minimal">
                              Minimal Template
                            </SelectItem>
                            <SelectItem value="detailed">
                              Detailed Template
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="submit">Save changes</Button>
            <Button type="button" variant="destructive">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
}
