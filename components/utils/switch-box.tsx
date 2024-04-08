import { Dispatch, SetStateAction } from "react";
import { Switch } from "../ui/switch"
import { Alert } from "./alert";

type ParamsType = {
  title: string;
  content: string;
  isChecked: boolean;
  onCheckedChange?: () => void;
  mode?: "small" | "big"
  alertTitle?: string;
  alertMessage?: string;
}

export const SwitchBox = ({
  title, content, isChecked, onCheckedChange, mode = "big", alertTitle, alertMessage
}: ParamsType) => {
  return (
    <div className="w-full flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <p className={`text-black font-medium ${mode === 'big' ? "text-xl" : "text-base"}`}>{title}</p>
        <p className="text-sm text-gray-500">{content}</p>
      </div>
      <Alert title={alertTitle} message={alertMessage} onContinue={onCheckedChange}>
        <Switch
          checked={isChecked}
        />
      </Alert>
    </div>
  )
}