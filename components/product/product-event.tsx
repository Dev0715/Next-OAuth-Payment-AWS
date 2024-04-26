import { ProductEvent } from "@/shared/types/types-product";
import { Badge } from "../ui/badge";

type Props = {
  event: ProductEvent;
};

const variantText = (state: string) => {
  if (state === "created" || state === "updated") {
    return "default";
  } else if (state === "approved") {
    return "success";
  } else if (state === "rejected") {
    return "destructive";
  } else {
    return "secondary";
  }
};

export const ProductEventCard = ({ event }: Props) => {
  return (
    <div className="w-full flex gap-x-6">
      <div className="w-1/3 flex items-center gap-x-2">
        <Badge variant={variantText(event.state)}>{event.state}</Badge>
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
