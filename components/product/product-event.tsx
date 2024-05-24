import { Badge } from "@/components/ui/badge";
import {
  PRODUCT_STATE_BADGE_VARIANT,
  STATE_DISPLAY_TEXT
} from "@/shared/constants/product.constant";

import type { ProductEvent } from "@/shared/types/product.type";

type Props = {
  event: ProductEvent;
};

export const ProductEventCard = ({ event }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <Badge variant={PRODUCT_STATE_BADGE_VARIANT[event.state]}>
          {STATE_DISPLAY_TEXT[event.state]}
        </Badge>
        <p className="text-gray-500 text-sm">by</p>
        <p className="font-semibold">{event.userId}</p>
        <p className="text-gray-500 text-sm">at</p>
        <p className="text-gray-500 text-sm font-medium">
          {`${new Date(event.time).toLocaleDateString()} ${new Date(event.time).toLocaleTimeString()}`}
        </p>
      </div>
      <div className="pl-2">
        <pre className="text-sm text-gray-700">{event.comment}</pre>
      </div>
    </div>
  );
};
