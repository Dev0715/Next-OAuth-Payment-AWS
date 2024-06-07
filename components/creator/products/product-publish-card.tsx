import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { ProductInfo } from "@/components/product/product-info";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { GradientButton } from "@/components/utils/gradient-button";
import { QuestionAlert } from "@/components/utils/question-alert";

import type { Product } from "@/shared/types/product.type";

type Props = {
  product: Product;
  onWithdrawFromApplied: () => void;
};

export const ProductPublishCard = ({
  product,
  onWithdrawFromApplied
}: Props) => {
  const history = useRouter();
  const [isPreview, setPreview] = useState<boolean>(false);

  const onGoBack = () => {
    history.back();
  };

  return (
    <div className="flex flex-col gap-y-6">
      <div className="text-base">
        <p>Congratulations!</p>
        <p>Your product is applied to publish.</p>
        <p>Please wait till the managers publish it.</p>
      </div>

      <div className="w-full flex justify-between">
        <div className="flex gap-x-4">
          <GradientButton className="w-64 flex gap-x-4" onClick={onGoBack}>
            <FaArrowLeft />
            Go back
          </GradientButton>
          <QuestionAlert
            title="Withdraw"
            message="Are you sure want to withdraw product from applied queue?"
            onContinue={onWithdrawFromApplied}
          >
            <GradientButton
              variant={"destructive"}
              className="w-64 flex gap-x-4"
            >
              Withdraw from Applied
            </GradientButton>
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
        <Card className="p-6">
          <ProductInfo product={product} isPending={true} />
        </Card>
      ) : null}
    </div>
  );
};
