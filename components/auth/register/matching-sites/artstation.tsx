import { Switch } from "@/components/ui/switch";

type Props = {
  value: boolean;
  setValue: (value: boolean) => void;
};

export const ArtStation = ({ value, setValue }: Props) => {
  return (
    <div className="w-full flex items-end justify-between p-4 border border-green-700 rounded-xl">
      <p>
        <span className="font-semibold">ArtStation</span> username:{" "}
        <span className="text-green-700">artstation_user</span>
      </p>
      <Switch checked={value} onCheckedChange={setValue} />
    </div>
  );
};
