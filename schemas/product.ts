import { z } from "zod";

export const NewProductSchema = z.object({
  submitComment: z.string().min(1, "Submit comment is required"),
  productType: z.string().min(1, "Product type is required"),
  title: z
    .string()
    .min(1, "Title is required")
    .max(120, "Title must be a maximum of 120 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(2400, "Description must be a maximum of 2400 characters"),
  price: z.number().min(1, "Price is required")
});
