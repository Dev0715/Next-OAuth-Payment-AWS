import * as z from "zod";

// for `Profile Settings` Form
export const ProfileSchema = z.object({
  username: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  bio: z
    .string()
    .min(10, { message: "Bio must be at least 10 characters long" })
    .max(160, { message: "Bio must be a maximum of 160 characters" })
});
