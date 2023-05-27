import dotenv from "dotenv"
dotenv.config()

import { stripe } from "../utils/stripe"

export async function cancelAllSubscriptions(): Promise<void> {
  try {
    const subscriptions = await stripe.subscriptions.list({
      status: "active",
    })

    console.log(`Found ${subscriptions.data.length} subscriptions to cancel`)

    const cancelPromises = subscriptions.data.map((subscription) => stripe.subscriptions.del(subscription.id))

    await Promise.all(cancelPromises)
  } catch (error) {
    throw new Error(`Failed to cancel subscriptions: ${error}`)
  }
}

cancelAllSubscriptions()
