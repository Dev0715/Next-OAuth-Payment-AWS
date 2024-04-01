import * as z from "zod";

// for `Profile Settings` Form
export const ProfileSchema = z.object({
  userName: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters"),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters long" })
    .max(160, { message: "Bio must be a maximum of 160 characters" })
});
