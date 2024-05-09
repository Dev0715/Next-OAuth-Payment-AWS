import * as z from "zod";

// for `Set New Password` Form
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Passwords must be at least 6 characters long"
  })
});

// for `Send Reset Password email` Form
export const ResetSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email"
  })
});

// for `Login` Form
export const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters"),
  code: z.optional(z.string())
});

// for `Account Setting` Form
export const PasswordChangeSchema = z.object({
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters"),
  newPassword: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters"),
  confirmPassword: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters")
});

// for `Creator Registration` Form
export const CreatorSettingsSchema = z.object({
  cover: z.string().optional(),
  username: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  email: z.string().email({ message: "Please enter a valid email" }),
  bio: z.string().optional(),
  jobTitle: z.string().optional(),
  companyTitle: z.string().optional(),
  companyWebsite: z.string().optional(),
  companyCountry: z.string().optional(),
  website1: z.string().optional(),
  website2: z.string().optional(),
  website3: z.string().optional(),
  website4: z.string().optional(),
  website5: z.string().optional()
});

// for `User Registration` Form
export const CustomerRegisterSchema = z.object({
  avatar: z.string().optional(),
  username: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  email: z.string().email({ message: "Please enter a valid email" }),
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  lastname: z
    .string()
    .min(1, "Last name is required")
    .max(72, "Last name must be a maximum of 72 characters"),
  address: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  phone1: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  phone2: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters")
});
