import { NextApiRequest, NextApiResponse } from "next"
import { Readable } from "node:stream"
import Stripe from "stripe"

import path from "path"
import { stripe } from "../../../lib/stripe"
import { sendEmail } from "../../../utils/email-helpers"
import { getCustomerBySubscription, manageSubscriptionStatusChange } from "../../../utils/stripe-helpers"

// Stripe requires the raw body to construct the event.
export const config = {
  api: {
    bodyParser: false,
  },
}

async function buffer(readable: Readable) {
  const chunks = []
  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks)
}

const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
])

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const sig = req.headers["stripe-signature"]
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    let event: Stripe.Event

    try {
      if (!sig || !webhookSecret) return
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret)
    } catch (err: any) {
      console.log(`❌ Error message: ${err.message}`)
      return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (relevantEvents.has(event.type)) {
      try {
        switch (event.type) {
          case "customer.subscription.created":
          case "customer.subscription.updated":
          case "customer.subscription.deleted":
            const subscription = event.data.object as Stripe.Subscription
            await manageSubscriptionStatusChange(
              subscription.id,
              subscription.customer as string,
              event.type === "customer.subscription.created",
            )
            break
          case "customer.subscription.trial_will_end":
            const subscription_ = event.data.object as Stripe.Subscription
            const user = await getCustomerBySubscription(subscription_.id)

            console.log(`User (${user?.id}) free trial is ending soon`)

            if (!user) {
              throw new Error("Could not find user with subscription")
            }

            if (!subscription_.default_payment_method) {
              console.log(`User (${user?.id}) does not have a default payment method`)

              // Send an email asking the customer to update their payment method
              const templatePath = path.join(process.cwd(), "emails", "payment-expiring.hbs")

              console.log(`Sending email at ${templatePath} user (${user?.id})`)

              sendEmail(
                [{ name: user?.name || undefined, email: user.email! }],
                "Your Free Trial is Ending Soon",
                templatePath,
                {
                  customer_name: user.name,
                  manage_payment_url: `${process.env.NEXTAUTH_URL}/payment/manage`,
                },
              )
            }
            break
          case "checkout.session.completed":
            const checkoutSession = event.data.object as Stripe.Checkout.Session
            if (checkoutSession.mode === "subscription") {
              const subscriptionId = checkoutSession.subscription
              await manageSubscriptionStatusChange(subscriptionId as string, checkoutSession.customer as string, true)
            }
            break
          default:
            throw new Error("Unhandled relevant event!")
        }
      } catch (error) {
        console.log(error)
        return res.status(400).send('Webhook error: "Webhook handler failed. View logs."')
      }
    }

    res.json({ received: true })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}

export default webhookHandler
