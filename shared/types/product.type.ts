export type ProductType =
  | "ui-kits"
  | "dashboard-wireframes"
  | "themes-spas"
  | "plugins"
  | "icon-sets-brushes-actions"
  | "fonts"
  | "mockups-posters"
  | "scaffolding-starters"
  | "3d-assets"
  | "illustrations"
  | "documents-page-templates"
  | "spreadsheets"
  | "photos"
  | "video"
  | "audio-sound-effects";

export type ProductState =
  | "created"
  | "updated"
  | "submitted"
  | "resubmitted"
  | "approved"
  | "rejected"
  | "applied"
  | "published"
  | "withdrawn-applied"
  | "withdrawn-published";

export type CreativeFile = {
  name: string;
  path: string;
};

export type ProductEvent = {
  state: ProductState;
  comment: string;
  userId: string;
  time: string;
};

export type ProductLink = {
  productType: ProductType;
  productId: string;
};

export type Product = ProductLink & {
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
