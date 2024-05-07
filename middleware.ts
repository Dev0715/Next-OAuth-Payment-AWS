import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentRole } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const role = await currentRole();

  if (isRolePath(pathname) && !role.isAuthenticated) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    (isManagerPath(pathname) && !role.isManager) ||
    (isCreatorPath(pathname) && !role.isCreator) ||
    (isCustomerPath(pathname) && !role.isCustomer)
  ) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  if (isNotManagerPath(pathname) && role.isManager) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
};

const isRolePath = (pathname: string) => {
  return (
    isManagerPath(pathname) ||
    isCreatorPath(pathname) ||
    isCustomerPath(pathname) ||
    isAffiliatePath(pathname)
  );
};

const isManagerPath = (pathname: string) => {
  return pathname.startsWith("/admin");
};

const isNotManagerPath = (pathname: string) => {
  return (
    isCreatorPath(pathname) ||
    isCustomerPath(pathname) ||
    isAffiliatePath(pathname)
  );
};

const isCreatorPath = (pathname: string) => {
  return pathname.startsWith("/creator");
};

const isCustomerPath = (pathname: string) => {
  return pathname.startsWith("/cart") || pathname.startsWith("/user");
};

const isAffiliatePath = (pathname: string) => {
  // return pathname.startsWith("/affiliate");
  return false;
};
