import { Switch } from "@/components/ui/switch";

type Props = {
  value: boolean;
  setValue: (value: boolean) => void;
};

export const Dribble = ({ value, setValue }: Props) => {
  return (
    <div className="w-full flex items-end justify-between p-4 border border-green-700 rounded-xl">
      <div className="flex flex-col gap-y-2">
        <p className="text-xl font-semibold">Dribble</p>
        <p className="text-base">
          Your username: <span className="text-green-700">dribble_user</span>
        </p>
      </div>
      <Switch checked={value} onCheckedChange={setValue} />
    </div>
  );
};
