import { PRODUCT_STATE_BADGE_VARIANT } from "@/shared/constants/product.constant";
import { Badge } from "../ui/badge";

import type { ProductEvent } from "@/shared/types/product.type";

type Props = {
  event: ProductEvent;
};

export const ProductEventCard = ({ event }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <Badge variant={PRODUCT_STATE_BADGE_VARIANT[event.state]}>
          {event.state}
        </Badge>
        <p>
          by <span className="font-semibold">{event.userId}</span>
        </p>
      </div>
      <p className="text-sm text-gray-700">{event.comment}</p>
    </div>
  );
};
