import { NextRequest, NextResponse } from "next/server";

import { currentRole } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const role = await currentRole();

  if (role.isAuthenticated && isAuthPath(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (role.isAuthenticated && pathname === "/") {
    const redirectUrl = role.isManager
      ? "/admin"
      : role.isCreator
        ? `/creator/${role.userId}`
        : "/user";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  if (!role.isAuthenticated && isAuthenticatedPath(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  if (
    (!role.isManager && isManagerPath(pathname)) ||
    (!role.isCreator && isCreatorPath(pathname)) ||
    (!role.isCustomer && isCustomerPath(pathname))
  ) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  if (role.isManager && isNotManagerPath(pathname)) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
};

const isAuthPath = (pathname: string) => {
  return pathname.startsWith("/auth");
};

const isAuthenticatedPath = (pathname: string) => {
  return isRolePath(pathname) || isUserPath(pathname);
};

// ## Authenticated User
const isUserPath = (pathname: string) => {
  return pathname.startsWith("/user");
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
  return pathname.startsWith("/cart");
};

const isAffiliatePath = (pathname: string) => {
  // return pathname.startsWith("/affiliate");
  return false;
};
