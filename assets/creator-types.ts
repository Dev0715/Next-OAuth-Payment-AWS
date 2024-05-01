export const CREATOR_TYPES = [
  "UI/UX Designer",
  "Web Designer",
  "Project Manager"
] as const;

export type TypeOfUser = (typeof CREATOR_TYPES)[number];
