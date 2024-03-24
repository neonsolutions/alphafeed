import type { GetServerSidePropsContext, NextPage } from "next"
import { Session, getServerSession } from "next-auth"
import Head from "next/head"
import LandingPage from "../components/landingPage"
import { IPriceIds } from "../interfaces/IPriceIds"
import { authOptions } from "../pages/api/auth/[...nextauth]"

interface Props {
  priceIds: IPriceIds
}
export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  return {
    props: {
      priceIds: {
        monthlyPriceId: 2,
        yearlyPriceId: 3,
      },
      user: null,
    },
  }
}

const Home: NextPage<Props & { user: Session["user"] }> = ({ priceIds, user }) => {
  return (
    <>
      <Head>
        <title>Alpha Feed</title>
      </Head>
      <LandingPage {...priceIds} user={user} />
    </>
  )
}

export default Home
