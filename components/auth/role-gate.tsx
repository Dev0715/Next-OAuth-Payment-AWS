"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { FormError } from "@/components/utils/form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: "ADMIN" | "USER";
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  if (
    (role.isManager && allowedRole === "USER") ||
    (!role.isManager && allowedRole === "ADMIN")
  ) {
    return (
      <FormError message="You do not have permission to view this content!" />
    );
  }

  return <>{children}</>;
};
