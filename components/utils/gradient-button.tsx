import { WrappedButton } from "./wrapped-button";

type Props = {
  className: string;
  label: string;
  onClick: () => void;
};

export const GradientButton = ({ className, label, onClick }: Props) => {
  return (
    <WrappedButton
      className={`${className} h-auto px-5 pt-[4px] pb-1.5 bg-gradient-to-r from-[#BD99C9] to-[#4AA8FE] border-[2px] border-white rounded-full text-white hover:from-[#4AA8FE] hover:to-[#BD99C9] transition-all duration-300 ease-in-out cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </WrappedButton>
  );
};
