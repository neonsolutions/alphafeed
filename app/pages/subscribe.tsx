import { GetServerSidePropsContext } from "next"
import { Session, getServerSession } from "next-auth"
import { useEffect, useState } from "react"
import Pricing from "../components/Pricing"
import { IPriceIds } from "../interfaces/IPriceIds"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import { User } from "@prisma/client"

interface Props {
  priceIds: IPriceIds
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  const { PRICE_ANNUAL_ID, PRICE_MONTHLY_ID } = process.env

  if (!PRICE_ANNUAL_ID || !PRICE_MONTHLY_ID) {
    throw new Error("PRICE_ANNUAL_ID and PRICE_MONTHLY_ID must be set")
  }

  return {
    props: {
      priceIds: {
        monthlyPriceId: PRICE_MONTHLY_ID,
        yearlyPriceId: PRICE_ANNUAL_ID,
      },
      user: session?.user,
    },
  }
}

export default function Subscribe({ priceIds, user }: Props & { user: Session["user"] }) {
  const [subscriptionType, setSubscriptionType] = useState("monthly")

  const [checkSubscription, setCheckSubscription] = useState(true)

  useEffect(() => {
    if (checkSubscription) {
      // Fetch /api/check-subscription every 2 seconds to see if the user has an active subscription
      const interval = setInterval(async () => {
        const response = await fetch("/api/check-subscription")

        if (!response.ok) {
          return
        }

        const { user: newUser } = (await response.json()) as { user: User | undefined }

        if (newUser?.stripeSubscriptionStatus === "active" || newUser?.stripeSubscriptionStatus === "trialing") {
          window.location.href = "/feed"
        }
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [checkSubscription])

  return (
    <div className="px-6 lg:px-8 pb-32 pt-24  border-t-2 border-gray-200 dark:border-gray-800 flex justify-center ">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl text-center ">
          Pricing
        </h2>
        <Pricing
          monthlyPriceId={priceIds.monthlyPriceId}
          monthlyPrice={2.5}
          yearlyPriceId={priceIds.yearlyPriceId}
          yearlyPrice={25}
          setSubscriptionType={setSubscriptionType}
          user={user}
        />
      </div>
    </div>
  )
}
