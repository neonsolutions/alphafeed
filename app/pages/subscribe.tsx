import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import Pricing from "../components/Pricing"
import { IPriceIds } from "../interfaces/IPriceIds"
import { useState } from "react"

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
      hasSubscription: session?.user?.hasActiveSubscription,
    },
  }
}

export default function Subscribe({ priceIds, hasSubscription }: Props & { hasSubscription: boolean }) {
  const [subscriptionType, setSubscriptionType] = useState("monthly")

  return (
    <div className="px-6 lg:px-8 pb-32 pt-24  border-t-2 border-gray-200 flex justify-center ">
      <div>
        <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl text-center">Pricing</h2>
        <Pricing
          monthlyPriceId={priceIds.monthlyPriceId}
          monthlyPrice={2}
          yearlyPriceId={priceIds.yearlyPriceId}
          yearlyPrice={20}
          setSubscriptionType={setSubscriptionType}
          hasSubscription={hasSubscription}
        />
      </div>
    </div>
  )
}
