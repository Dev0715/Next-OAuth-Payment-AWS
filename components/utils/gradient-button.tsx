type Props = {
  className: string;
  label: string;
  onClick: () => void;
};

export const GradientButton = ({ className, label, onClick }: Props) => {
  return (
    <span
      className={`${className} w-fit h-fit px-5 bg-gradient-to-r from-[#BD99C9] to-[#4AA8FE] border-[2px] border-white rounded-full text-white hover:from-[#4AA8FE] hover:to-[#BD99C9] transition-all duration-300 ease-in-out shadow-md cursor-pointer`}
      onClick={onClick}
    >
      {label}
    </span>
  );
};
