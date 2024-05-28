type Props = {
  children: React.ReactNode;
  className: string;
};

export const GradientParagraph = ({ children, className }: Props) => {
  return (
    <p
      className={`bg-gradient-to-r from-[#702B69] to-[#2B7AC3] bg-clip-text text-transparent ${className}`}
    >
      {children}
    </p>
  );
};
