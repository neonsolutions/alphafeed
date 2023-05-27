import { NextApiHandler } from "next"
import { stripe } from "../../../utils/stripe"
import { createOrRetrieveCustomer } from "../../../utils/stripe-helpers"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

const CreatePortalLink: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(403).json({ error: { statusCode: 403, message: "Not authorized" } })
  }

  if (req.method === "POST") {
    try {
      const customer = await createOrRetrieveCustomer(session?.user?.email)

      if (!customer) throw Error("Could not get customer")
      const { url } = await stripe.billingPortal.sessions.create({
        customer: customer.stripeCustomerId!,
        return_url: `${process.env.SERVER_ENDPOINT}/feed`,
      })

      return res.status(200).json({ url })
    } catch (err: any) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default CreatePortalLink
