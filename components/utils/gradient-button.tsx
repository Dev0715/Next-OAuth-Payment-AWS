import { Button, ButtonProps } from "../ui/button";

type Props = {
  className?: string;
  children: React.ReactNode;
} & ButtonProps;

export const GradientButton = ({ className, children, ...props }: Props) => {
  const bgClassName =
    props.variant === "destructive"
      ? "bg-destructive text-destructive-foreground"
      : "bg-gradient-to-r from-[#BD99C9] to-[#4AA8FE] hover:from-[#4AA8FE] hover:to-[#BD99C9]";

  return (
    <Button
      className={`h-fit ${className} px-5 border-[2px] border-white rounded-full font-firs text-white transition-all duration-300 ease-in-out shadow-md cursor-pointer ${bgClassName}`}
      {...props}
    >
      {children}
    </Button>
  );
};
