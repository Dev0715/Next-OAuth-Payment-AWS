import { atom } from "jotai";

import type { Product } from "@/shared/types/product.type";

const orderListAtom = atom<Product[]>([]);

export { orderListAtom };
