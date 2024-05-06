import { getCookies } from "cookies-next";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = async (request: NextRequest) => {
  const session = getCookies();
  console.log(session);

  return NextResponse.redirect(notFound());
};

export const config = {
  matcher: "/admin"
};
