import { auth } from "@/auth";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return {
    isAuthenticated: session?.user || false,
    isManager: session?.user?.manager?.isManager || false,
    isCreator: session?.user.creator?.isCreator || false,
    isCustomer: session?.user.customer?.isCustomer || false,
    isAffiliate: session?.user.affiliate?.isAffiliate || false
  };
};
