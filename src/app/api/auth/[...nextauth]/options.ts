import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

export const AuthOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [{ email: credentials.identifier }, { username: credentials.identifier }],
          });

          if (!user) {
            throw new Error("User not found with provided detail");
          }

          if (!user.isVerified) {
            throw new Error("Please verify your account first");
          }

          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);

          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }
          console.log("thsi is loggedin user: " + user)
          return user;
        } catch (error: any) {
          console.error("Err in authorize: " + error);
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }

      // console.log("usertoken data", token)

      if (
        (account?.provider === "google" ||
          account?.provider === "github" ||
          account?.provider === "instagram") &&
        profile
      ) {
        const { email } = profile;
        

        if (email?.endsWith("@gmail.com")) {
          try {
            await dbConnect();
            const foundUser = await UserModel.findOne({ email });

            token._id = foundUser?.id.toString();
            token.username = foundUser?.username;
            token.isVerified = foundUser?.isVerified;
            token.isAcceptingMessages = foundUser?.isAcceptingMessages;
          } catch (error) {
            console.error("Error Signing in...", error);
            throw new Error("Error Signing in...");
          }
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      // console.log("this is session datata",session)
      // console.log("this is token data session ke niche ",token)
      return session;
    },
    async signIn({ account, profile }) {
      if (
        (account?.provider === "google" ||
          account?.provider === "github" ||
          account?.provider === "instagram") &&
        profile
      ) {
        const { email, name } = profile;
        console.log("Profile : ", profile);
        if (email?.endsWith("@gmail.com")) {
          try {
            await dbConnect();
            let foundUser = await UserModel.findOne({ email });

            if (!foundUser) {
              const random = Math.floor(100 + Math.random() * 900).toString();
              const username = name?.split(" ")[0].concat(random).toLowerCase();

              const new_user = new UserModel({
                username,
                email,
                isVerified: true,
                isAcceptingMessages: true,
                verifyCodeExpiry: Date.now(),
                verifyCode: random,
                password: random,
              });

              // console.log(new_user)

              await new_user.save({ validateBeforeSave: false });

              // console.log("loginuser", new_user)
              return true;
            }
            return true;
          } catch (error) {
            console.error("Error Signing in...", error);
            throw new Error("Error Signing in...");
          }
        }
        return false;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/sign-in",
  },
};
