import { PrismaClient } from "@prisma/client"
import fs from "fs"
import handlebars from "handlebars"
import path from "path"
import dotenv from "dotenv"
import sgMail, { MailDataRequired } from "@sendgrid/mail"
import { getPostsForDate } from "../lib/feed"
import { EmailData } from "@sendgrid/helpers/classes/email-address"
import { IFeedPost } from "../interfaces/IFeedPost"

// Load environment variables from .env file
dotenv.config()

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

const prisma = new PrismaClient()
const templatePath = process.env.EMAIL_TEMPLATE_PATH!

async function main() {
  // Fetch posts and subscribed users from the database
  const posts = await getPostsForDate(new Date())

  if (posts === undefined) {
    throw new Error("`posts` is undefined")
  }

  const activeOrTrialingUsers = await prisma.user.findMany({
    where: {
      OR: [{ stripeSubscriptionStatus: "active" }, { stripeSubscriptionStatus: "trialing" }],
    },
  })

  console.log(`Sending emails to ${activeOrTrialingUsers.length} users`)

  // Read the Handlebars template
  fs.readFile(path.join(__dirname, "..", templatePath), "utf8", (err, templateString) => {
    if (err) throw err

    // Compile the template
    const template = handlebars.compile(templateString)

    const dateString = new Date().toLocaleDateString()

    // Generate HTML using the fetched posts
    const html = template({ posts, date: dateString })

    // Prepare an array of messages
    const emails: EmailData[] = activeOrTrialingUsers.map((user) => ({
      name: user.name ?? "",
      email: user.email!,
    }))

    const message: MailDataRequired = {
      from: {
        email: process.env.EMAIL_FROM!,
        name: "Alpha Feed Gist",
      },
      to: emails,
      subject: `Daily Digest for ${dateString}`,
      html,
      text: generatePlainText(posts),
    }

    // Send the emails
    sgMail
      .send(message)
      .then(() => console.log("Emails sent successfully"))
      .catch((error) => console.error(error.toString()))
  })
}

function generatePlainText(posts: IFeedPost[]): string {
  let result = "Your daily digest:\n\n"

  for (let post of posts) {
    result += `Title: ${post.title}\n`
    result += `Body: ${post.body}\n`

    result += `Scores:\n`
    result += `  Significance: ${post.scores.significance}\n`
    result += `  Relevance: ${post.scores.relevance}\n`
    result += `  Impact: ${post.scores.impact}\n`
    result += `  Novelty: ${post.scores.novelty}\n`
    result += `  Reliability: ${post.scores.reliability}\n`

    if (post.media) {
      result += `Media: ${post.media.join(", ")}\n`
    }

    result += `Source: ${post.source}\n`
    result += `Link: ${post.link}\n`

    if (post.externalLinks) {
      result += `External Links: ${post.externalLinks.join(", ")}\n`
    }

    result += `Published At: ${post.publishedAt}\n`

    // Add a separator between posts
    result += `\n-------------------------\n\n`
  }

  return result
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })