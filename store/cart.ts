import { atom } from "jotai";

import type { ProductLink } from "@/shared/types/product.type";

const cartAtom = atom<ProductLink[] | undefined>(undefined);

export { cartAtom };
