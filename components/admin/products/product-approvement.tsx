import { Dispatch, SetStateAction } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { QuestionAlert } from "@/components/utils/question-alert";

type Props = {
  isPending: boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  onCommentProduct: (isApproved: boolean) => void;
};

export const ProductApprovement = ({
  isPending,
  comment,
  setComment,
  onCommentProduct
}: Props) => {
  return (
    <Card className="w-full p-6 flex flex-col gap-y-4">
      <p className="text-2xl font-semibold">Product Approvement</p>
      <div className="w-full flex items-end justify-between gap-x-8">
        <div className="w-full flex flex-col gap-y-1">
          <p>Your Comment</p>
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
            onContinue={() => onCommentProduct(true)}
          >
            <Button
              disabled={isPending}
              variant={"default"}
              className="w-32 rounded-none"
            >
              Approve
            </Button>
          </QuestionAlert>
          <QuestionAlert
            title="Reject Product"
            message="Are you sure to reject this product?"
            onContinue={() => onCommentProduct(false)}
          >
            <Button
              disabled={isPending}
              variant={"destructive"}
              className="w-32 rounded-none"
            >
              Reject
            </Button>
          </QuestionAlert>
        </div>
      </div>
    </Card>
  );
};
