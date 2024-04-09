import { z } from "zod";

export const ProductRegistrationSchema = z.object({
  title: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  description: z
    .string()
    .min(1, "Last name is required")
    .max(72, "Last name must be a maximum of 72 characters"),
  address: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters")
});
