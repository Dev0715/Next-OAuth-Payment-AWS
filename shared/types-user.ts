import { TypeOfUser } from "@/assets/creator-types";
import {
  CreatorDetailsSchema,
  GeneralDetailsSchema,
  SelectAccountsSchema
} from "@/schemas/auth/register";
import { z } from "zod";

export type ProductLink = {
  productType: string;
  productId: string;
};

export type Address = {
  addy1: string;
  addy2?: string;
  city: string;
  postal: string;
  country: string;
  geo?: {
    lat: number;
    lng: number;
  };
};

export type Company = {
  name: string;
  country?: string;
  website?: string;
};

export type CreatorData = {
  isCreator: boolean;
  creatorId: string;
  cover?: string;
  bio: string;
  typeOfUser: TypeOfUser;
};

export type CustomerData = {
  isCustomer: boolean;
  customerId: string;
};

export type AffiliateData = {
  isAffiliate: boolean;
  affiliateId: string;
};

export type User = {
  userId: string;
  username: string;

  email: string;
  firstname: string;
  lastname?: string;

  avatar?: string;
  image?: string; // in case of social login

  phone1?: string;
  phone2?: string;
  websites?: string[];

  address: Address;
  company: Company;

  creator?: CreatorData;
  customer?: CustomerData;
  affiliate?: AffiliateData;

  products?: ProductLink[];
  cart?: ProductLink[];
  purchasedProducts: ProductLink[];
};

export type SignedUpData = {
  generalDetails: z.infer<typeof GeneralDetailsSchema>;
  selectedAccounts: z.infer<typeof SelectAccountsSchema>;
  creatorDetails: z.infer<typeof CreatorDetailsSchema>;
  creatorMatchings: {
    env: boolean;
    beh: boolean;
    art: boolean;
    drb: boolean;
    cmk: boolean;
  };
};
