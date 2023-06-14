import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      // Is the user paying for a subscription
      hasActiveSubscription: boolean
      stripeSubscriptionId: string | null

      // Is the user subscribed to the newsletter
      optedOutNewsletter: boolean
    } & DefaultSession["user"]
  }
}
