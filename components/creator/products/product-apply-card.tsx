import { ProductInfo } from "@/components/product/product-info";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Product } from "@/shared/types/product.type";

export const ProductApplyCard = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="text-lg">
        <p>Congratulations!</p>
        <p>Your product is approved.</p>
        <p>You can apply for this product to publish.</p>
      </div>

      <div className="w-full flex justify-between">
        <div className="flex gap-x-4">
          <Button className="w-64 gap-x-4 rounded-none">
            Apply for publish
          </Button>
          <Button className="w-64 gap-x-4 rounded-none">Update more</Button>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="show-details" />
          <Label htmlFor="show-details">Product Preview</Label>
        </div>
      </div>

      <Card className="p-6 rounded-none">
        <ProductInfo product={product} isPending />
      </Card>
    </div>
  );
};
