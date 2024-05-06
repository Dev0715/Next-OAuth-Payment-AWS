"use client";

import { SideNavBar } from "@/components/admin/utils/side-navbar";
import { useCurrentRole } from "@/hooks/use-current-role";
import { notFound } from "next/navigation";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const role = useCurrentRole();

  if (!role.isManager) {
    return notFound();
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] flex">
      <SideNavBar />
      <div className="w-full px-12 pt-6 pb-24">{children}</div>
    </div>
  );
};

export default AdminLayout;
