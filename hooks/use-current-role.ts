import { useSession } from "next-auth/react";

export const useCurrentRole = () => {
  const session = useSession();

  return {
    isManager: session.data?.user?.manager?.isManager || false,
    isCreator: session.data?.user.creator?.isCreator || false,
    isCustomer: session.data?.user.customer?.isCustomer || false,
    isAffiliate: session.data?.user.affiliate?.isAffiliate || false
  };
};
