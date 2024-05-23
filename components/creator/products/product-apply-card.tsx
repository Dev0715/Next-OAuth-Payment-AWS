import { useState } from "react";

import { ProductInfo } from "@/components/product/product-info";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { QuestionAlert } from "@/components/utils/question-alert";
import { Product } from "@/shared/types/product.type";

type Props = {
  product: Product;
  onUpdateMore: () => void;
  onApply: () => void;
};

export const ProductApplyCard = ({ product, onUpdateMore, onApply }: Props) => {
  const [isPreview, setPreview] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="text-base">
        <p>Congratulations!</p>
        <p>Your product is approved.</p>
        <p>You can apply for this product to publish.</p>
      </div>

      <div className="w-full flex justify-between">
        <div className="flex gap-x-4">
          <Button className="w-64 flex gap-x-4 rounded-none" onClick={onApply}>
            Apply for publish
          </Button>
          <QuestionAlert
            title="Update"
            message="Are you sure want to update more?"
            onContinue={onUpdateMore}
          >
            <Button
              variant={"outline"}
              className="w-64 flex gap-x-4 border-green-700 rounded-none"
            >
              Update more
            </Button>
          </QuestionAlert>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="show-details"
            checked={isPreview}
            onCheckedChange={(checked) => setPreview(checked)}
          />
          <Label htmlFor="show-details">Product Preview</Label>
        </div>
      </div>

      {isPreview ? (
        <Card className="p-6 rounded-none">
          <ProductInfo product={product} isPending={true} />
        </Card>
      ) : null}
    </div>
  );
};
