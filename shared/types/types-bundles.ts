import { ProductLink } from "./types-user";

export type Bundle = {
  bundleId: string;
  userId: string;
  //  bundleType: string;
  title: string;
  description: string;
  price: number;
  products: ProductLink[];
};
