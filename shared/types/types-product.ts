export type ProductState = "created" | "approved" | "rejected" | "updated";

type CreativeFile = {
  name: string;
  path: string;
};

export type ProductEvent = {
  state: ProductState;
  comment: string;
  userId: string;
};

export type Product = {
  productType: string;
  productId: string;
  ownerId: string;
  title: string;
  description: string;
  price: number;
  fileList: CreativeFile[];
  previewList: string[];
  keywords: string[];
  approval: {
    state: ProductState;
    history: ProductEvent[];
  };
};

export interface CartProduct extends Product {
  selected: boolean;
}
