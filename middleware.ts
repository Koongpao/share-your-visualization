import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    // console.log(request.nextauth.token);

    //user/favorite
    //user/my-visualizations
    //tag/add
    //post

    if (
      (request.nextUrl.pathname.startsWith("/user/favorite") ||
        request.nextUrl.pathname.startsWith("/user/my-visualizations") ||
        request.nextUrl.pathname.startsWith("/tag-list/add") ||
        request.nextUrl.pathname.startsWith("/post")) &&
      !request.nextauth.token
    ) {
      //redirect unauthorized user to denied page
      return NextResponse.rewrite(new URL("/unauthenticated", request.url));
    }
  },
  {
    callbacks: {
      authorized: () => true,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
