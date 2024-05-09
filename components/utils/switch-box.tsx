import { Switch } from "../ui/switch";
import { QuestionAlert } from "./question-alert";

type ParamsType = {
  disabled?: boolean;
  title: string;
  content: string;
  isChecked: boolean;
  onCheckedChange?: () => void;
  alertTitle?: string;
  alertMessage?: string;
};

export const SwitchBox = ({
  disabled,
  title,
  content,
  isChecked,
  onCheckedChange,
  alertTitle,
  alertMessage
}: ParamsType) => {
  return (
    <div className="w-full flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <p className={`text-black font-medium text-xl`}>{title}</p>
        <p className="text-sm text-gray-500">{content}</p>
      </div>
      <QuestionAlert
        title={alertTitle}
        message={alertMessage}
        onContinue={onCheckedChange}
      >
        <Switch checked={isChecked} disabled={disabled} />
      </QuestionAlert>
    </div>
  );
};
