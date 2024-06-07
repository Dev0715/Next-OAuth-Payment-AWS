import { z } from "zod";

export const GeneralDetailsSchema = z.object({
  // avatar: z.instanceof(File).optional(),
  username: z
    .string()
    .min(1, "Username is required")
    .max(72, "Username must be a maximum of 72 characters"),
  firstname: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  lastname: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .min(6, "Passwords must be at least 6 characters long")
    .max(32, "Passwords must be a maximum of 32 characters")
  // address1: z
  //   .string()
  //   .min(1, "Address1 is required")
  //   .max(72, "Address1 must be a maximum of 72 characters"),
  // address2: z.string().optional(),
  // city: z
  //   .string()
  //   .min(1, "City is required")
  //   .max(72, "City must be a maximum of 72 characters"),
  // postal: z
  //   .string()
  //   .min(1, "Postal code is required")
  //   .max(72, "Postal code must be a maximum of 72 characters"),
  // country: z
  //   .string()
  //   .min(1, "Country is required")
  //   .max(72, "Country must be a maximum of 72 characters"),
  // phone1: z.string().optional(),
  // phone2: z.string().optional()
});

export const SelectAccountsSchema = z.object({
  creator: z.boolean(),
  user: z.boolean(),
  affiliate: z.boolean()
});

export const CreatorDetailsSchema = z.object({
  // cover: z.instanceof(File).optional(),
  bio: z.string().optional(),
  // .min(6, "Bio should be at least 6 characters long")
  // .max(1024, "Bio must be a maximum of 1024 characters"),
  jobTitle: z.string().min(1, "Type of user is required"),
  companyName: z.string().optional(),
  companyCountry: z.string().optional(),
  companyWebsite: z.string().optional()
  // website1: z.string().optional(),
  // website2: z.string().optional(),
  // website3: z.string().optional(),
  // website4: z.string().optional(),
  // website5: z.string().optional()
});

export const TaxInfoSchema = z.object({
  usPerson: z.boolean()
});

export const w9DetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  lastName: z.string().optional(),
  businessName: z
    .string()
    .min(1, "Business name is required")
    .max(72, "Business name must be a maximum of 72 characters")
    .optional(),
  taxClassification: z.string().min(1, "Tax Classification is required"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  city: z
    .string()
    .min(1, "City / Town is required")
    .max(72, "City / Town must be a maximum of 72 characters"),
  state: z
    .string()
    .min(1, "State / Province is required")
    .max(72, "State / Province must be a maximum of 72 characters"),
  zip: z
    .string()
    .min(1, "ZIP / Post Code is required")
    .max(72, "ZIP / Post Code must be a maximum of 72 characters"),
  accountNumbers: z.string().optional(),
  taxIdType: z.string().min(1, "Tax ID Type is required"),
  taxIdNumber: z.string().min(1, "Tax ID Number is required")
});

export const W8IndividualDetailsSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  lastName: z.string().optional(),
  countryCitizenShip: z
    .string()
    .min(1, "Country of CitizenShip is required")
    .max(72, "Country of Citizenship must be a maximum of 72 characters"),
  countryResidence: z
    .string()
    .min(1, "Country of Residence is required")
    .max(72, "Country of Residence must be a maximum of 72 characters"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(72, "Address must be a maximum of 72 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(72, "City must be a maximum of 72 characters"),
  state: z.string().optional(),
  zip: z.string().optional(),
  taxIdType: z.string().min(1, "Tax ID Type is required"),
  taxIdNumber: z.string().min(1, "Tax ID Number is required"),
  referenceNumber: z
    .string()
    .min(1, "Reference Number is required")
    .max(72, "Reference Number must be a maximum of 72 characters"),
  dateOfBirthday: z
    .string()
    .min(1, "Date of Birth is required")
    .max(72, "Date of Birth must be a maximum of 72 characters")
});

export const W8CorporationDetailsSchema = z.object({
  organizationName: z
    .string()
    .min(1, "Organization name is required")
    .max(72, "Organization name must be a maximum of 72 characters"),
  countryIncorporation: z
    .string()
    .min(1, "Country of Incorporation is required")
    .max(72, "Country of Incorporation must be a maximum of 72 characters"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(72, "First name must be a maximum of 72 characters"),
  lastName: z.string().optional(),
  entityName: z.string().optional(),
  chapter3Status: z
    .string()
    .min(1, "Chapter 3 Status is required")
    .max(72, "Chapter 3 Status must be a maximum of 72 characters"),
  residenceAddress: z
    .string()
    .min(1, "Permanent Residence Address is required")
    .max(72, "Permanent Residence Address must be a maximum of 72 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .max(72, "City must be a maximum of 72 characters"),
  state: z.string().optional(),
  zip: z.string().optional(),
  countryOfResidence: z
    .string()
    .min(1, "Country of Residence is required")
    .max(72, "Country of Residence must be a maximum of 72 characters"),
  taxIdType: z.string().min(1, "Tax ID Type is required"),
  taxIdNumber: z.string().min(1, "Tax ID Number is required"),
  mailingAddress: z.string().optional(),
  mailingCity: z.string().optional(),
  mailingZip: z.string().optional(),
  mailingCountry: z.string().optional()
});
