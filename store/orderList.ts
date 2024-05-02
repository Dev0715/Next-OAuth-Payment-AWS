import { Product } from "@/shared/types/product.type";
import { atom } from "jotai";

const orderListAtom = atom<Product[]>([]);

export { orderListAtom };
