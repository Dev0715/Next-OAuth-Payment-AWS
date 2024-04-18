type CreativeFile = {
  name: string;
  path: string;
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
};

export interface CartItemType extends Product {
  selected: boolean;
}
