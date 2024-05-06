import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { currentRole } from "./lib/auth";

export const middleware = async (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  const role = await currentRole();

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/forbidden")
  ) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") && !role.isManager) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  } else if (!pathname.startsWith("/admin") && role.isManager) {
    return NextResponse.redirect(new URL("/forbidden", request.url));
  }

  return NextResponse.next();
};

// export const config = {
//   matcher: "/admin/:path*"
// };
