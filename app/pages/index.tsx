import type { NextPage } from "next"
import Head from "next/head"
import LandingPage from "../components/landingPage"
import Layout from "../components/layout"
import type { InferGetStaticPropsType, GetStaticProps } from "next"
import { IPriceIds } from "../interfaces/IPriceIds"

interface Props {
  priceIds: IPriceIds
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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
    },
  }
}

const Home: NextPage<Props> = ({ priceIds }: Props) => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage {...priceIds} />
    </>
  )
}

export default Home
