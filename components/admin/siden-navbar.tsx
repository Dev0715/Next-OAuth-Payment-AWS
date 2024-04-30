import { FaUser } from "react-icons/fa";
import { MenuItem } from "./menu-item";

export const SideNavBar = () => {
  return (
    <div className="h-full flex flex-col gap-y-1 px-4 bg-gray-200">
      <MenuItem />
      <MenuItem />
      <MenuItem />
    </div>
  );
};
