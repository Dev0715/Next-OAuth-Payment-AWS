import { PRODUCT_STATE_BADGE_VARIANT } from "@/shared/constants/product.constant";
import { Badge } from "../ui/badge";

import type { ProductEvent } from "@/shared/types/product.type";

type Props = {
  event: ProductEvent;
};

export const ProductEventCard = ({ event }: Props) => {
  return (
    <div className="w-full flex gap-x-6">
      <div className="w-1/3 flex items-center gap-x-2">
        <Badge variant={PRODUCT_STATE_BADGE_VARIANT[event.state]}>
          {event.state}
        </Badge>
        <p>
          by <span className="font-semibold">{event.userId}</span>
        </p>
      </div>
      <div className="w-2/3 flex">
        <p>{event.comment}</p>
      </div>
    </div>
  );
};
