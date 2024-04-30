import { FaUser } from "react-icons/fa";

export const MenuItem = () => {
  return (
    <div className="w-full flex items-center gap-x-4 px-4 py-2 hover:bg-sky-200 rounded-xl cursor-pointer">
      <FaUser />
      Manage Users
    </div>
  );
};
