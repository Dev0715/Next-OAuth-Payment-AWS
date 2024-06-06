import { Switch } from "@/components/ui/switch";

type Props = {
  value: boolean;
  setValue: (value: boolean) => void;
};

export const Dribble = ({ value, setValue }: Props) => {
  return (
    <div className="w-full flex items-end justify-between p-4 border border-green-700 rounded-xl">
      <p>
        <span className="font-semibold">Dribble</span> username:{" "}
        <span className="text-green-700">dribble_user</span>
      </p>
      <Switch checked={value} onCheckedChange={setValue} />
    </div>
  );
};
