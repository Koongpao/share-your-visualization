import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    // console.log(request.nextUrl.pathname);
    console.log(request.nextauth.token);
    //Example of request.nextauth.token
    // {
    //   name: 'test',
    //   email: 'test@gmail.com',
    //   sub: '6580346e130bf9f7a9bee3d3',
    //   id: '6580346e130bf9f7a9bee3d3',
    //   role: 'user',
    //   accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTgwMzQ2ZTEzMGJmOWY3YTliZWUzZDMiLCJ1c2VybmFtZSI6InRlc3QiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJpYXQiOjE3MDQ1NjA4OTh9.zDk1Rm_Xn_-pcUGAxAYvR59A9FYC4CGLFe3zsXjWKy8',
    //   iat: 1704560905,
    //   exp: 1707152905,
    //   jti: '7de171d5-ad04-461a-8eef-76223a1b3c2d'
    // }
    console.log(!request.nextauth.token);

    if (
      (request.nextUrl.pathname.startsWith("/user/favorites") ||
        request.nextUrl.pathname.startsWith("/user/my-visualizations") ||
        request.nextUrl.pathname.startsWith("/tag-list/add") ||
        request.nextUrl.pathname.startsWith("/post")) &&
      !request.nextauth.token
    ) {
      //redirect unauthorized user to denied page
      console.log("redirect loey la kan")
      console.log("conditions: ", request.nextUrl.pathname, ",", request.nextauth.token)
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
}

// export const config = {
//   matcher: ["/post", "/user/my-visualizations", "/user/favorites", "/tag-list/add"]
// };
