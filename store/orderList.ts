import { Product } from "@/shared/types-product";
import { atom } from "jotai";

const orderListAtom = atom<Product[]>([]);

export { orderListAtom };
