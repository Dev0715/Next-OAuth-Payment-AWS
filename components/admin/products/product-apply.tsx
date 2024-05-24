import { Button } from "@/components/ui/button";
import { QuestionAlert } from "@/components/utils/question-alert";
import { Card } from "@/components/ui/card";

type Props = {
  isPending: boolean;
  onPublish: () => void;
};

export const ProductApply = ({ isPending, onPublish }: Props) => {
  return (
    <Card className="w-full p-6 flex flex-col gap-y-4">
      <p className="text-2xl font-semibold">Product Approvement</p>
      <div className="w-full flex items-end justify-between gap-x-8">
        <div className="flex items-center gap-x-4">
          <QuestionAlert
            title="Approve Product"
            message="Are you sure to approve this product?"
            onContinue={() => onPublish()}
          >
            <Button
              disabled={isPending}
              variant={"default"}
              className="w-32 rounded-none"
            >
              Approve
            </Button>
          </QuestionAlert>
        </div>
      </div>
    </Card>
  );
};
