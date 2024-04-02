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
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters"),
  name: z
    .string()
    .min(1, "A name is required")
    .max(72, "Name must be a maximum of 72 characters")
});

// for `Creator Registration` Form
export const CreatorRegisterSchema = z.object({
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
    .max(72, "Last name must be a maximum of 72 characters")
});
