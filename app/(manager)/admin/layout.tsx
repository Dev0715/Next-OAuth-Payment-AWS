import { SideNavBar } from "@/components/admin/side-navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-full flex">
      <SideNavBar />
      <div className="w-full px-12 pt-6 pb-24">{children}</div>
    </div>
  );
};

export default AdminLayout;