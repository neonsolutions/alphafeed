import { GetServerSidePropsContext } from "next"
import { authOptions } from "../api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { createOrRetrieveCustomer } from "../../utils/stripe-helpers"
import { stripe } from "../../lib/stripe"
import { useEffect } from "react"
import { signIn } from "next-auth/react"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  let billingPortalUrl: string | null = null

  if (session?.user && session.user.email) {
    const customer = await createOrRetrieveCustomer(session.user.email)

    if (!customer) throw Error("Could not get customer")
    const { url } = await stripe.billingPortal.sessions.create({
      customer: customer.stripeCustomerId!,
      return_url: `${process.env.SERVER_ENDPOINT}/feed`,
    })
    billingPortalUrl = url

    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    }
  }

  return {
    props: {
      billingPortalUrl,
    },
  }
}

export default function ManagePayment({ billingPortalUrl }: { billingPortalUrl: string | null }) {
  useEffect(() => {
    signIn("google", { callbackUrl: "/payment/manage" })
  }, [])

  return <div>Manage Payment</div>
}
