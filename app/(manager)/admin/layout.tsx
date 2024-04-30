import { SideNavBar } from "@/components/admin/side-navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-full flex">
      <SideNavBar />
      {children}
    </div>
  );
};

export default AdminLayout;
