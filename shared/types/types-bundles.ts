import { ProductLink } from "./types-user";

type BundleState = "editing" | "available";

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
