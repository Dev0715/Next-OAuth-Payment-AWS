import { Switch } from "../ui/switch";

type Props = {
  title: string;
  isChecked: boolean;
};

export const RoleSwitchBox = ({ title, isChecked }: Props) => {
  return (
    <div className="w-full flex items-center justify-between rounded-3xl border p-4">
      <div className="space-y-0.5">
        <p className="text-black font-medium text-base">{title}</p>
      </div>
      <Switch disabled checked={isChecked} />
    </div>
  );
};
