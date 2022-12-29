import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import prisma from "../../../lib/prismadb";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
      // profile(profile) {
      //   return {
      //     id: profile.id,
      //     name: profile.displayName,
      //     email: profile.emails[0].value,
      //     picture: profile.photos[0].value,
      //   };
      // }
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
});
