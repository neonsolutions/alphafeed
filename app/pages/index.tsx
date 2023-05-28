import type { NextPage, GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import { authOptions } from "../pages/api/auth/[...nextauth]"
import Head from "next/head"
import LandingPage from "../components/landingPage"
import Layout from "../components/layout"
import type { InferGetStaticPropsType, GetStaticProps } from "next"
import { IPriceIds } from "../interfaces/IPriceIds"
import { prisma } from "../lib/db"

interface Props {
  priceIds: IPriceIds
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session || !session.user || !session.user.email) {
    console.log("No session found")
    return
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  })

  if (!user) {
    console.log("No user found")
    return
  }

  let hasSubscription = false

  if (user?.stripeSubscriptionStatus === "active" || user?.stripeSubscriptionStatus === "trialing") {
    hasSubscription = true
  }

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
      hasSubscription,
    },
  }
}

const Home: NextPage<Props & { hasSubscription: boolean }> = ({ priceIds, hasSubscription }) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage {...priceIds} hasSubscription={hasSubscription} />
    </>
  )
}

export default Home
