import { GradientButton } from "../utils/gradient-button";

type Props = {
  comment: string;
  label: string;
  onClick: () => void;
};

export const AuthButton = ({ comment, label, onClick }: Props) => {
  return (
    <div className="flex flex-col items-center gap-y-1">
      <p className="text-sm text-[#543E77] font-semibold">{comment}</p>
      <GradientButton label={label} onClick={onClick} />
    </div>
  );
};
