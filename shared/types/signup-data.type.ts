import { z } from "zod";

import {
  CreatorDetailsSchema,
  GeneralDetailsSchema,
  SelectAccountsSchema,
  TaxInfoSchema,
  w9DetailsSchema
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
  taxInformation: z.infer<typeof TaxInfoSchema>;
  w9Details: z.infer<typeof w9DetailsSchema>;
};
