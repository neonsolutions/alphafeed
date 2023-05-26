import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "../../../lib/db"

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.SECRET,
  adapter: PrismaAdapter(prisma),
}

export default NextAuth(authOptions)
