import { ProductEventCard } from "./product-event";

import type { ProductEvent } from "@/shared/types/product.type";

type Props = {
  history: ProductEvent[];
};

export const ProductHistory = ({ history }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      {history.map((event, index) => (
        <ProductEventCard key={index} event={event} />
      ))}
    </div>
  );
};
