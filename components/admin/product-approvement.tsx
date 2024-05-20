import { QuestionAlert } from "@/components/utils/question-alert";
import { Textarea } from "@/components/ui/textarea";

export const ProductApprovement = () => {
  return (
    <div className="w-full flex flex-col gap-y-4">
      <p className="text-2xl font-semibold">Product Approvement</p>
      <div className="flex flex-col gap-y-1">
        <p>Your Comment</p>
        <Textarea
          disabled={isPending}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-1/2"
        />
      </div>
      <div className="flex items-center gap-x-4">
        <QuestionAlert
          title="Approve Product"
          message="Are you sure to approve this product?"
          onContinue={() => onCommentProduct(true)}
        >
          <Button disabled={isPending} variant={"default"}>
            Approve
          </Button>
        </QuestionAlert>
        <QuestionAlert
          title="Reject Product"
          message="Are you sure to reject this product?"
          onContinue={() => onCommentProduct(false)}
        >
          <Button disabled={isPending} variant={"destructive"}>
            Reject
          </Button>
        </QuestionAlert>
      </div>
    </div>
  );
};
