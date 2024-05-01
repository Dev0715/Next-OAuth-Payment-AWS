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

export const PRODUCT_TYPE_DISPLAY_Text: Record<ProductType, string> = {
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
