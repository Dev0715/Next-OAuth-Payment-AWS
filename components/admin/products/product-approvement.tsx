import { Dispatch, SetStateAction } from "react";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

import { GradientButton } from "@/components/utils/gradient-button";
import { GradientParagraph } from "@/components/utils/gradient-paragraph";

import { QuestionAlert } from "@/components/utils/question-alert";
import { ProductState } from "@/shared/types/product.type";

type Props = {
  isPending: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onCommentProduct: (action: ProductState) => void;
};

export const ProductApprovement = ({
  isPending,
  comment,
  setComment,
  onCommentProduct
}: Props) => {
  return (
    <Card className="w-full p-6 flex flex-col gap-y-4">
      <GradientParagraph className="text-2xl font-semibold">
        Product Approvement
      </GradientParagraph>
      <div className="w-full flex items-end justify-between gap-x-8">
        <div className="w-full flex flex-col gap-y-1">
          <p className="font-firs">Your Comment</p>
          <Textarea
            disabled={isPending}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <QuestionAlert
            title="Approve Product"
            message="Are you sure to approve this product?"
            onContinue={() => onCommentProduct("approved")}
          >
            <GradientButton disabled={isPending} className="w-32">
              Approve
            </GradientButton>
          </QuestionAlert>
          <QuestionAlert
            title="Reject Product"
            message="Are you sure to reject this product?"
            onContinue={() => onCommentProduct("rejected")}
          >
            <GradientButton
              disabled={isPending}
              variant={"destructive"}
              className="w-32"
            >
              Reject
            </GradientButton>
          </QuestionAlert>
        </div>
      </div>
    </Card>
  );
};
