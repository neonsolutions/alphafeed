import { prisma } from "../lib/prisma"
import { stripe } from "../lib/stripe"

export async function createOrRetrieveCustomer(userEmail: string) {
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Return the existing customer if they have a Stripe Customer ID
  if (user.stripeCustomerId) {
    return user
  }

  // Create a new customer and save the Stripe Customer ID on the user record
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    metadata: {
      userId: user.id,
    },
  })

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      stripeCustomerId: customer.id,
    },
  })
  return updatedUser
}

export function getCustomerBySubscription(subscriptionId: string) {
  return prisma.user.findFirst({
    where: {
      stripeSubscriptionId: subscriptionId,
    },
  })
}

export async function manageSubscriptionStatusChange(subscriptionId: string, customerId: string, createAction = false) {
  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  })

  if (!user) {
    throw new Error("User not found")
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  })

  if (!subscription) {
    throw new Error("Subscription not found")
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      stripeSubscriptionId: subscription.id,
      stripeSubscriptionStatus: subscription.status,
    },
  })
}
