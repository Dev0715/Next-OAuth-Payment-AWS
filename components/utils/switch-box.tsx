import { Dispatch, SetStateAction } from "react";
import { Switch } from "../ui/switch";
import { QuestionAlert } from "./question-alert";

type ParamsType = {
  mode?: "small" | "big";
  title: string;
  content: string;
  isChecked: boolean;
  onCheckedChange?: () => void;
  alertTitle?: string;
  alertMessage?: string;
};

export const SwitchBox = ({
  title,
  content,
  isChecked,
  onCheckedChange,
  mode = "big",
  alertTitle,
  alertMessage
}: ParamsType) => {
  return (
    <div className="w-full flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <p
          className={`text-black font-medium ${mode === "big" ? "text-xl" : "text-base"}`}
        >
          {title}
        </p>
        <p className="text-sm text-gray-500">{content}</p>
      </div>
      <QuestionAlert
        title={alertTitle}
        message={alertMessage}
        onContinue={onCheckedChange}
      >
        <Switch checked={isChecked} />
      </QuestionAlert>
    </div>
  );
};
