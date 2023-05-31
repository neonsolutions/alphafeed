import type { GetServerSidePropsContext, NextPage } from "next"
import { getServerSession } from "next-auth"
import Head from "next/head"
import LandingPage from "../components/landingPage"
import { IPriceIds } from "../interfaces/IPriceIds"
import { authOptions } from "../pages/api/auth/[...nextauth]"

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
      hasSubscription: session?.user?.hasActiveSubscription || false,
    },
  }
}

const Home: NextPage<Props & { hasSubscription: boolean }> = ({ priceIds, hasSubscription }) => {
  return (
    <>
      <Head>
        <title>Alpha Feed</title>
      </Head>
      <LandingPage {...priceIds} hasSubscription={hasSubscription} />
    </>
  )
}

export default Home
