import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);

    if (
      (request.nextUrl.pathname.startsWith("/user/favorites") ||
        request.nextUrl.pathname.startsWith("/user/my-visualizations") ||
        request.nextUrl.pathname.startsWith("/tag-list/request") ||
        request.nextUrl.pathname.startsWith("/post")) &&
      !request.nextauth.token
    ) {
      //redirect unauthorized user to unauthenticated page
      return NextResponse.rewrite(new URL("/unauthenticated", request.url));
    }
    if (
      (request.nextUrl.pathname.startsWith("/admin/pending-visualizations") ||
      request.nextUrl.pathname.startsWith("/admin/requested-tags")) &&
      (request.nextauth.token?.role !== "admin" || !request.nextauth.token)
    ){
      return NextResponse.rewrite(new URL("/unauthorized", request.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    // authorized: ({ token }) => Boolean(token),
    },
    pages: {
      signIn: "/login",
    },
  }
);

// // export const config = {
// //   matcher: "/((?!api|static|.\..|_next).*)",
// // };

export const config = {
  matcher: ["/user/favorites", "/user/my-visualizations", "/tag-list/request", "/post", "/admin/pending-visualizations", "/admin/requested-tags"],
};

