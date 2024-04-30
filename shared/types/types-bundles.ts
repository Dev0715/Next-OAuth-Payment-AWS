import { ProductLink } from "./types-user";

export type Bundle = {
  bundleType: string; // need to update like productType when bundle types are defined
  bundleId: string;
  creatorId: string;
  title: string;
  description: string;
  price: number;
  products: ProductLink[];
};
