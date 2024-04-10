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
  bitcoin: z.string().optional(),
  ethereum: z.string().optional(),
  litecoin: z.string().optional(),
  dogecoin: z.string().optional(),
  xrp: z.string().optional(),
  sol: z.string().optional(),
  usdcoin: z.string().optional(),
  avax: z.string().optional(),
  tron: z.string().optional()
});

// for 'Payment Preference' Form
export const PaymentPrefSchema = z.object({
  paypal: z.string().optional(),
  cashapp: z.string().optional(),
  venmo: z.string().optional(),
  zelle: z.string().optional(),
  applepay: z.string().optional(),
  googlepay: z.string().optional(),
  amazonpay: z.string().optional()
});

// for 'Donate Preference' Form
export const DonatePrefSchema = z.object({
  lfxmentorship: z.string().optional(),
  gofundme: z.string().optional(),
  kickstarter: z.string().optional(),
  indiegogo: z.string().optional(),
  githubsponsors: z.string().optional(),
  opencollective: z.string().optional(),
  tidelift: z.string().optional(),
  issuehunt: z.string().optional(),
  patreon: z.string().optional(),
  buymeacoffee: z.string().optional(),
  kofi: z.string().optional()
});
