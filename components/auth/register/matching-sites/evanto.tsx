import { Switch } from "@/components/ui/switch";

type Props = {
  value: boolean;
  setValue: (value: boolean) => void;
};

export const Evanto = ({ value, setValue }: Props) => {
  return (
    <div className="w-full flex items-end justify-between p-4 border border-sky-700 rounded-xl">
      <p>
        <span className="font-semibold">Evanto</span> username:{" "}
        <span className="text-green-700">evanto_user</span>
      </p>
      <Switch checked={value} onCheckedChange={setValue} />
    </div>
  );
};
