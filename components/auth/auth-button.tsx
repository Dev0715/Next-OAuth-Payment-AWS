import { GradientButton } from "../utils/gradient-button";

type Props = {
  comment: string;
  label: string;
  onClick: () => void;
};

export const AuthButton = ({ comment, label, onClick }: Props) => {
  return (
    <div className="text-center flex flex-col items-center gap-y-1">
      <p className="font-firs text-sm text-[#543E77] font-semibold">
        {comment}
      </p>
      <GradientButton
        className="font-firs leading-none text-xl pt-[6px] pb-[9px] font-semibold"
        label={label}
        onClick={onClick}
      />
    </div>
  );
};
