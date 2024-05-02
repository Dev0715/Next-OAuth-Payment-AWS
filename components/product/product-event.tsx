import { ProductEvent, ProductState } from "@/shared/types/product.type";
import { Badge, BadgeVariant } from "../ui/badge";

const STATE_BADGE_VARIANT: Record<ProductState, BadgeVariant> = {
  created: "default",
  approved: "success",
  rejected: "destructive",
  updated: "secondary"
};

type Props = {
  event: ProductEvent;
};

export const ProductEventCard = ({ event }: Props) => {
  return (
    <div className="w-full flex gap-x-6">
      <div className="w-1/3 flex items-center gap-x-2">
        <Badge variant={STATE_BADGE_VARIANT[event.state]}>{event.state}</Badge>
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
