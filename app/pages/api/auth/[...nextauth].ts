import { PrismaAdapter } from "@next-auth/prisma-adapter"
import type { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { prisma } from "../../../lib/prisma"

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.SECRET!,
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user, token }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      })
      if (dbUser && session.user) {
        session.user.hasActiveSubscription =
          dbUser?.stripeSubscriptionStatus === "active" || dbUser?.stripeSubscriptionStatus === "trialing"
            ? true
            : false
        session.user.stripeSubscriptionId = dbUser?.stripeSubscriptionId

        session.user.optedOutNewsletter = dbUser?.optedOutNewsletter
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
