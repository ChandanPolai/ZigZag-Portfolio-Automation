import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string;
      isVerified?: boolean;
      isAcceptingMessages?: boolean;
      username?: string;
    } & DefaultSession["user"];
  }

  interface User {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    isVerified?: boolean;
    isAcceptingMessages?: boolean;
    username?: string;
  }
}








// types/next-auth.d.ts
// import NextAuth from "next-auth";
// import { User as NextAuthUser } from "next-auth";

// declare module "next-auth" {
//   interface User {
//     _id?: string;
//     isVerified?: boolean;
//     isAcceptingMessages?: boolean;
//     username?: string;
//   }

//   interface Session {
//     user: User;
//   }
// }






