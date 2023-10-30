import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isLoginPage = (url: string) => {
  return url.includes("/auth/login");
};
export function middleware(request: NextRequest) {
  const isToken = !!request.cookies?.get("accessToken")?.value;
  let url = "/auth/login";
  if (isToken && isLoginPage(request.url)) {
    url = "/";
  }
  return isToken !== isLoginPage(request.url)
    ? NextResponse.next()
    : NextResponse.redirect(new URL(url, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|404|500|robots.txt|sitemap.xml).*)",
  ],
};
