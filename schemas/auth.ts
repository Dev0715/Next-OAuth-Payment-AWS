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

// for `Signup` Form
export const RegisterSchema = z.object({
  username: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  firstname: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  lastname: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters")
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
export const CreatorRegisterSchema = z.object({
  avatar: z.string().optional(),
  username: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
  bio: z
    .string()
    .min(22, "Bio must be a minimum of 24 characters")
    .max(2400, "Bio must be a maximum of 2400 characters"),
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  lastname: z
    .string()
    .min(1, "Last name is required")
    .max(72, "Last name must be a maximum of 72 characters"),
  email: z.string().email({ message: "Please enter a valid email" }),
  typeOfUser: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters"),
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
