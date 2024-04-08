import { Dispatch, SetStateAction } from "react";
import { Switch } from "../ui/switch"

type ParamsType = {
  title: string;
  content: string;
  isChecked: boolean;
  setIsChecked?: Dispatch<SetStateAction<boolean>>;
  mode?: "small" | "big"
}

export const SwitchBox = ({
  title, content, isChecked, setIsChecked, mode = "big"
}: ParamsType) => {
  return (
    <div className="w-full flex items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        <p className={`text-black font-medium ${mode === 'big' ? "text-xl" : "text-base"}`}>{title}</p>
        <p className="text-sm text-gray-500">{content}</p>
      </div>
      <Switch
        checked={isChecked}
        onCheckedChange={setIsChecked}
      />
    </div>
  )
}