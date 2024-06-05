import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

type Props = {
  link: string;
  icon: React.ReactNode;
  title: string;
};

export const MenuItem = ({ link, icon, title }: Props) => {
  const pathname = usePathname();

  const isSelected = useMemo(() => {
    return pathname === link;
  }, [pathname]);

  return (
    <Link href={link}>
      <div
        className={`w-full flex items-center gap-x-4 px-4 py-2 my-2 rounded-md cursor-pointer
        text-gray-700 text-base drop-shadow-md
        hover:bg-sky-100 hover:text-sky-500 transition-all duration-200 ease-in-out
        ${isSelected ? "bg-sky-200 text-sky-500" : ""}`}
      >
        {icon}
        {title}
      </div>
    </Link>
  );
};
