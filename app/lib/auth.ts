import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JwtPayload, jwtDecode } from "jwt-decode";
import NextAuth from "next-auth/next";

interface MyJwtPayload extends JwtPayload {
  userId: string;
  username: string;
  role: string;
  email: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        usernameOrEmail: { label: "usernameOrEmail", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials.");
        }
        const response = await fetch("https://share-your-visualization-backend.vercel.app/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            usernameOrEmail: credentials?.usernameOrEmail,
            password: credentials?.password,
          }),
        });
        const jsonResponse = await response.json();
        const decoded = jwtDecode<MyJwtPayload>(jsonResponse.data.token);

        return {
          id: decoded.userId,
          name: decoded.username,
          role: decoded.role,
          email: decoded.email,
          accessToken: jsonResponse.data.token,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) {
        return baseUrl + url;
      } else if (new URL(url).origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
    jwt({ token, user }) {
      // console.log("------------jwt begin---------------");
      // console.log("token => ", token);
      // console.log("user => ", user);
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    session({ session, token }) {
      // console.log("------------session begin---------------");
      // console.log("session => ", session);
      // console.log("token => ", token);
      // console.log("------------session end---------------");
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.role = token.role;
      session.user.accessToken = token.accessToken;
      // console.log("session-session => ", session);
      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions)