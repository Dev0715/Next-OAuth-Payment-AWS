import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentRole } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const role = await currentRole();

  // if (isGlobalPath(pathname)) {
  //   return NextResponse.next();
  // }

  if (
    (isManagerPath(pathname) && !role.isManager) ||
    (isCreatorPath(pathname) && !role.isCreator) ||
    (isCustomerPath(pathname) && !role.isCustomer)
  ) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
};

// export const config = {
//   matcher: "/admin/:path*"
// };

// const isGlobalPath = (pathname: string) => {
//   return (
//     pathname.startsWith("/_next") ||
//     pathname.startsWith("/api") ||
//     pathname.startsWith("/forbidden")
//   );
// };

const isManagerPath = (pathname: string) => {
  return pathname.startsWith("/admin");
};

const isCreatorPath = (pathname: string) => {
  return pathname.startsWith("/creator");
};

const isCustomerPath = (pathname: string) => {
  return pathname.startsWith("/cart") || pathname.startsWith("/user");
};

// const isAffiliatePath = (pathname: string) => {
//   return pathname.startsWith("/affiliate");
// };
