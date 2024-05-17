import { useState } from "react";
import { Button } from "../ui/button";
import { ProductEventCard } from "./product-event";

import type { ProductEvent } from "@/shared/types/product.type";

type Props = {
  history: ProductEvent[];
};

export const ProductHistory = ({ history }: Props) => {
  const _history = history.toReversed();

  const [showMore, setShowMore] = useState<boolean>(false);

  const onShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <div className="w-full flex flex-col gap-y-4">
      <div className="w-full flex items-end justify-between">
        <ProductEventCard event={_history[0]} />
        <Button
          variant={"outline"}
          className="h-8 border border-green-700 rounded-none"
          onClick={onShowMore}
        >
          Show {showMore ? "Less" : "More"}
        </Button>
      </div>
      <div className="w-full flex flex-col gap-y-4">
        {_history.map((event, index) =>
          index > 0 ? <ProductEventCard key={index} event={event} /> : null
        )}
      </div>
    </div>
  );
};
