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

// for 'Crypto Preference' Form
export const CryptoPrefSchema = z.object({
  bitcoin: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  ethereum: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  litecoin: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  dogecoin: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  xrp: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  sol: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  usdcoin: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  avax: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  tron: z
    .string()
    .min(1, "An address is required")
    .max(72, "Address must be a maximum of 72 characters")
});
