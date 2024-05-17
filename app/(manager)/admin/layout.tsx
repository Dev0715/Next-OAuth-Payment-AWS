"use client";

import { SideNavBar } from "@/components/admin/utils/side-navbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-fit flex">
      <SideNavBar />
      <div className="w-full min-h-[calc(100vh-80px)] h-fit px-12 pt-6 pb-12">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
