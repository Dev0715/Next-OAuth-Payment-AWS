import { ProductLink } from "./types-user";

export type BundleState = "editing" | "available";

export type Bundle = {
  //  bundleType: string;
  bundleId: string;
  userId: string;
  title: string;
  state: BundleState;
  description?: string;
  price?: number;
  products?: ProductLink[];
};
