import { Button, ButtonProps } from "../ui/button";

type Props = {
  className?: string;
  children: React.ReactNode;
} & ButtonProps;

export const GradientButton = ({ className, children, ...props }: Props) => {
  return (
    <Button
      className={`${className} h-fit px-5 bg-gradient-to-r from-[#BD99C9] to-[#4AA8FE] border-[2px] border-white rounded-full font-firs text-white hover:from-[#4AA8FE] hover:to-[#BD99C9] transition-all duration-300 ease-in-out shadow-md cursor-pointer`}
      {...props}
    >
      {children}
    </Button>
  );
};
