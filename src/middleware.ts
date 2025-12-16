import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/register"];
const DASHBOARD_BUYER = "/dashboard/buyer";
const DASHBOARD_SELLER = "/dashboard/seller";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;
  const userRaw = request.cookies.get("user")?.value;

  const isAuthPage = AUTH_PAGES.some((path) =>
    pathname.startsWith(path)
  );

  if (!token) {
    if (isAuthPage) return NextResponse.next();

    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  if (!userRaw) return NextResponse.next();

  try {
    const user = JSON.parse(userRaw);
    const role = user.role;

    if (role === "BUYER" && pathname.startsWith("/dashboard/seller")) {
      return NextResponse.redirect(
        new URL(DASHBOARD_BUYER, request.url)
      );
    }

    if (role === "SELLER" && pathname.startsWith("/dashboard/buyer")) {
      return NextResponse.redirect(
        new URL(DASHBOARD_SELLER, request.url)
      );
    }
  } catch {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
