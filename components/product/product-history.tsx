import { ProductEvent } from "@/shared/types/types-product";
import { ProductEventCard } from "./product-event";

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
