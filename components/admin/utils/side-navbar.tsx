import { FaCartPlus, FaLayerGroup, FaUser } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MenuItem } from "./menu-item";

export const SideNavBar = () => {
  return (
    <div className="w-60 h-full min-h-full flex flex-col gap-y-1 px-4 py-6 bg-white drop-shadow">
      <MenuItem
        link="/admin/managers"
        title="Managers"
        icon={<RiAdminFill />}
      />
      <MenuItem link="/admin/users" title="Users" icon={<FaUser />} />
      <MenuItem link="/admin/bundles" title="Bundles" icon={<FaLayerGroup />} />
      <MenuItem link="/admin/products" title="Products" icon={<FaCartPlus />} />
    </div>
  );
};
