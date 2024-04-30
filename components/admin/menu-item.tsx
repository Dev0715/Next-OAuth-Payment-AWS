import Link from "next/link";
import { FaUser } from "react-icons/fa";

type Props = {
  link: string;
  icon: React.ReactNode;
  title: string;
};

export const MenuItem = ({ link, icon, title }: Props) => {
  return (
    <Link href={link}>
      <div
        className="w-full flex items-center gap-x-4 px-4 py-2 rounded-md cursor-pointer
        text-gray-700 text-base drop-shadow-md
        hover:bg-sky-100 hover:text-sky-500 transition-all duration-200 ease-in-out"
      >
        {icon}
        {title}
      </div>
    </Link>
  );
};
