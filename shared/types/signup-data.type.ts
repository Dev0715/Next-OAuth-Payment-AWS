import { z } from "zod";

import {
  CreatorDetailsSchema,
  GeneralDetailsSchema,
  SelectAccountsSchema
} from "@/schemas/auth/register";

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
