import { Button } from "../ui/button";

type Props = {
  label: string;
};

export const GradientButton = ({ label }: Props) => {
  return (
    <Button className="bg-gradient-to-r from-[#CD9CC9] to-[#387BC7] border-[2px] border-white rounded-full text-white">
      {label}
    </Button>
  );
};
