import { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Adapters from "next-auth/adapters"
import { prisma } from "../../../lib/db"

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
    ],
    secret: process.env.SECRET,
    callbacks: {
      async signIn({ user: userForeign, account, profile, email, credentials }) {
        // We got the profile, now we create or update the user
        let user = await prisma.user.findUnique({ where: { email: email } })
        // If user does not exist, create a new user
        if (!user) {
          user = await prisma.user.create({
            data: {
              email: email,
              name: profile?.name,
              provider: "google",
              provider_id: account?.userId,
              provider_access_token: credentials?.access_token,
              // Assuming you do not get stripe_customer_id and stripe_subscription_id from google,
              // if you get these from other sources, populate them here
              // stripe_customer_id: 'your-customer-id',
              // stripe_subscription_id: 'your-subscription-id',
              is_active_subscription: false, // Set it as per your requirements
            },
          })
        } else {
          // If user exists, update the access token
          user = await prisma.user.update({
            where: { email: profile.email },
            data: { provider_access_token: credentials.access_token },
          })
        }
        const isAllowedToSignIn = true
        if (isAllowedToSignIn) {
          return true
        } else {
          // Return false to display a default error message
          return false
          // Or you can return a URL to redirect to:
          // return '/unauthorized'
        }
      },
    },
  })
