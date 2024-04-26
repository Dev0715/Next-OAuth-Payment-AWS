import { ProductLink } from "@/shared/types/types-user";
import { atom } from "jotai";

const cartAtom = atom<ProductLink[] | undefined>(undefined);

export { cartAtom };
