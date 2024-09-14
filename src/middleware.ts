import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const urlPathname = request.nextUrl.pathname;

  console.log("Token:od middleware", token);
  console.log("URL Pathname: middlearwe", urlPathname);

  // Redirect to dashboard if the user is already authenticated
  if (
    token &&
    (urlPathname.startsWith("/sign-in") ||
      urlPathname.startsWith("/sign-up") ||
      urlPathname.startsWith("/verify") ||
      urlPathname === "/")
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect to sign-in if the user is not authenticated
  if (!token && urlPathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/sign-in", "/sign-up", "/", "/verify/:path*"],
};
