type ProductLink = {
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

export type CustomerInterface = {
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
};
