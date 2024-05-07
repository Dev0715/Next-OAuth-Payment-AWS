import type { ProductLink } from "./product.type";

export type Address = {
  address1: string;
  address2?: string;
  city: string;
  postal: string;
  country: string;
  geo?: {
    lat: number;
    lng: number;
  };
};

export type Company = {
  name?: string;
  country?: string;
  website?: string;
};

export type CreatorData = {
  isCreator: boolean;
  creatorId: string;
  cover?: string;
  bio?: string;
  jobTitle: string;
  company?: Company;
  websites?: string[];

  products?: ProductLink[];
};

export type CustomerData = {
  isCustomer: boolean;
  customerId: string;

  cart?: ProductLink[];
  purchases?: ProductLink[];
};

export type AffiliateData = {
  isAffiliate: boolean;
  affiliateId: string;
};

export type ManagerData = {
  isManager: boolean;
  managerId: string;
};

export type User = {
  userId: string;
  username: string;
  email: string;
  password?: string;

  firstname: string;
  lastname?: string;

  avatar?: string;
  image?: string; // in case of social login

  phone1?: string;
  phone2?: string;

  address?: Address;

  creator?: CreatorData;
  customer?: CustomerData;
  affiliate?: AffiliateData;
  manager?: ManagerData;

  verificationToken?: string;
  expires?: string;
};
