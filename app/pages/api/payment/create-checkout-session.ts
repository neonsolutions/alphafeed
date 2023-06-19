import { NextApiHandler } from "next"

import { getServerSession } from "next-auth"
import { stripe } from "../../../lib/stripe"
import { createOrRetrieveCustomer } from "../../../utils/stripe-helpers"
import { authOptions } from "../auth/[...nextauth]"

const CreateCheckoutSession: NextApiHandler = async (req, res) => {
  const session = await getServerSession(req, res, authOptions)

  if (!session?.user?.email) {
    return res.status(403).json({ error: { statusCode: 403, message: "Not authorized" } })
  }

  if (req.method === "POST") {
    const { priceId, quantity = 1, metadata = {} } = req.body

    try {
      const customer = await createOrRetrieveCustomer(session?.user?.email)

      if (
        customer.stripeSubscriptionId &&
        (customer.stripeSubscriptionStatus === "active" || customer.stripeSubscriptionStatus === "trialing")
      ) {
        return res.status(400).json({ error: { statusCode: 400, message: "You are already subscribed" } })
      }

      const stripeSession = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        // billing_address_collection: "required",
        customer: customer.stripeCustomerId!,
        line_items: [
          {
            price: priceId,
            quantity,
          },
        ],
        mode: "subscription",
        allow_promotion_codes: true,
        subscription_data: {
          trial_settings: {
            end_behavior: {
              missing_payment_method: "cancel",
            },
          },
          trial_period_days: 7,
        },
        payment_method_collection: "if_required",
        success_url: `${process.env.SERVER_ENDPOINT}/feed`,
        cancel_url: `${process.env.SERVER_ENDPOINT}/`,
      })

      return res.status(200).json({ sessionId: stripeSession.id })
    } catch (err: any) {
      console.log(err)
      res.status(500).json({ error: { statusCode: 500, message: err.message } })
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default CreateCheckoutSession
