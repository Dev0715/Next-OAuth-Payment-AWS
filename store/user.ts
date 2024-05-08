import { atom } from "jotai";

import { User } from "@/shared/types/user.type";

const userAtom = atom<User | undefined>(undefined);

export { userAtom };
