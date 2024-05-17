import type { BadgeVariant } from "@/components/ui/badge";
import type { ProductState, ProductType } from "../types/product.type";

export const PRODUCT_TYPE_DISPLAY_TEXT: Record<ProductType, string> = {
  "ui-kits": "UI Kits",
  "dashboard-wireframes": "Dashboard / Wireframes",
  "themes-spas": "Themes / SPAs",
  plugins: "Plugins",
  "icon-sets-brushes-actions": "Icon Sets / Brushes / Actions",
  fonts: "Fonts",
  "mockups-posters": "Mockups / Posters",
  "scaffolding-starters": "Scaffolding / Starters",
  "3d-assets": "3D Assets",
  illustrations: "Illustrations",
  "documents-page-templates": "Documents / Page Templates",
  spreadsheets: "Spreadsheets",
  photos: "Photos",
  video: "Video",
  "audio-sound-effects": "Audio / Sound Effects"
};

export const PRODUCT_STATE_BADGE_VARIANT: Record<ProductState, BadgeVariant> = {
  created: "default",
  approved: "success",
  rejected: "destructive",
  updated: "default"
};
