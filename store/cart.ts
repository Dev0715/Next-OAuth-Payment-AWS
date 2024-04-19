import { ProductLink } from "@/shared/types-user";
import { atom } from "jotai";

const cartAtom = atom<ProductLink[] | undefined>(undefined);

export { cartAtom };
