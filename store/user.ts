import { User } from "@/shared/types/user.type";
import { atom } from "jotai";

const userAtom = atom<User | undefined>(undefined);

export { userAtom };
