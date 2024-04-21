import { z } from "zod";

export const GeneralDetailsSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(72, "Username must be a maximum of 72 characters"),
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  lastname: z.string().optional(),
  address1: z
    .string()
    .min(1, "Address1 is required")
    .max(72, "Address1 must be a maximum of 72 characters"),
  address2: z.string().optional(),
  city: z
    .string()
    .min(1, "City is required")
    .max(72, "City must be a maximum of 72 characters"),
  postal: z
    .string()
    .min(1, "Postal code is required")
    .max(72, "Postal code must be a maximum of 72 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .max(72, "Country must be a maximum of 72 characters"),
  phone1: z.string().optional(),
  phone2: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters")
});

export const SelectAccountsSchema = z.object({
  creator: z.boolean(),
  user: z.boolean(),
  affiliate: z.boolean()
});

export const CreatorDetailsSchema = z.object({
  bio: z
    .string()
    .min(6, "Bio should be at least 6 characters long")
    .max(1024, "Bio must be a maximum of 1024 characters")
});
