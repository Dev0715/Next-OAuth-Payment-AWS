import { GradientButton } from "../utils/gradient-button";

type Props = {
  comment: string;
  label: string;
  onClick: () => void;
};

export const AuthButton = ({ comment, label, onClick }: Props) => {
  return (
    <div className="text-center space-y-1">
      <p className="font-firs text-sm text-[#543E77] font-semibold">
        {comment}
      </p>
      <GradientButton
        className="font-firs text-xl"
        label={label}
        onClick={onClick}
      />
    </div>
  );
};
