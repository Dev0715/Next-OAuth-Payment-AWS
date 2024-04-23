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

export type Creator = {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  bio: string;
  products: ProductLink[];
};

export type Customer = {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
};

export type CreatorData = {};

export type UserData = {};

export type AffiliateData = {};

export type User = {
  userId: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  creator: CreatorData;
  user: UserData;
  image?: string; // in case of social login
  avatar?: string;
  cover?: string;
  bio?: string;
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
