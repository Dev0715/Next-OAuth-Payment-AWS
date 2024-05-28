import { WrappedButton } from "./wrapped-button";

type Props = {
  className: string;
  label: string;
  onClick: () => void;
};

export const GradientButton = ({ className, label, onClick }: Props) => {
  return (
    <WrappedButton
      className={`${className} w-fit h-fit px-6 py-2 bg-gradient-to-r from-[#CD9CC9] to-[#387BC7] border-[2px] border-white rounded-full text-white leading-none
                hover:from-[#387BC7] hover:to-[#CD9CC9] hover:text-gray-700 transition-all duration-300 ease-in-out cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </WrappedButton>
  );
};
