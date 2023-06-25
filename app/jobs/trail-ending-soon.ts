import { PrismaClient } from "@prisma/client"
import sgMail from "@sendgrid/mail"
import dotenv from "dotenv"
import path from "path"
import { stripe } from "../lib/stripe"
import { sendEmail } from "../utils/email-helpers"

// Load environment variables from .env file
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const prisma = new PrismaClient()

async function main() {
  // Find stripe subscriptions with trials ending soon
  // const subscription_ = event.data.object as Stripe.Subscription
  const emails = process.argv.slice(2)

  console.log(emails)

  const users = await prisma.user.findMany({
    where: {
      stripeSubscriptionStatus: "trialing",
      email: {
        in: emails,
      },
    },
  })

  for (const user of users) {
    const subscription_ = await stripe.subscriptions.retrieve(user.stripeSubscriptionId!)

    console.log(`User (${user?.email}) free trial is ending soon`)

    if (!user) {
      throw new Error("Could not find user with subscription")
    }

    if (!subscription_.default_payment_method) {
      console.log(`User (${user.email}) does not have a default payment method`)

      // Send an email asking the customer to update their payment method
      const templatePath = path.join(process.cwd(), "emails", "payment-expiring.hbs")

      console.log(`Sending email at ${templatePath} user (${user.email})`)

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
  }
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
