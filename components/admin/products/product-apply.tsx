import { Card } from "@/components/ui/card";
import { GradientButton } from "@/components/utils/gradient-button";

import { QuestionAlert } from "@/components/utils/question-alert";

type Props = {
  isPending: boolean;
  onPublish: () => void;
};

export const ProductApply = ({ isPending, onPublish }: Props) => {
  return (
    <Card className="w-full p-6 flex flex-col gap-y-4">
      <div className="flex flex-col">
        <p className="text-2xl font-semibold">Publish Product</p>
        <p className="text-lg text-gray-500">
          You can publish this product so that users can see it.
        </p>
      </div>
      <div className="w-full flex items-end justify-between gap-x-8">
        <div className="flex items-center gap-x-4">
          <QuestionAlert
            title="Publish Product"
            message="Are you sure to publish this product?"
            onContinue={() => onPublish()}
          >
            <GradientButton
              disabled={isPending}
              variant={"default"}
              className="w-32"
            >
              Publish
            </GradientButton>
          </QuestionAlert>
        </div>
      </div>
    </Card>
  );
};
