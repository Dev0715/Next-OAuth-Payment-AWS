import {
  CreatorDetailsSchema,
  GeneralDetailsSchema,
  SelectAccountsSchema
} from "@/schemas/auth/register";
import { z } from "zod";

export type SignedUpData = {
  generalDetails: z.infer<typeof GeneralDetailsSchema>;
  selectedAccounts: z.infer<typeof SelectAccountsSchema>;
  creatorDetails: z.infer<typeof CreatorDetailsSchema>;
  creatorMatchings: {
    env: boolean;
    beh: boolean;
    art: boolean;
    drb: boolean;
    cmk: boolean;
  };
};
