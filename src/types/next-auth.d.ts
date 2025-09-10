import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    token: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
    };
    accessToken: string;
  }

  interface JWT {
    id: string;
    email: string;
    name: string;
    accessToken: string;
  }
}
