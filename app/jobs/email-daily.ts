import { PrismaClient, User } from "@prisma/client"
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
  const postsDate = new Date()
  // Update to yesterday
  postsDate.setDate(postsDate.getDate() - 2)

  console.log(`Fetching posts for ${postsDate.toLocaleDateString()}`)
  const posts = (await getPostsForDate(postsDate, 20))?.filter((post) => post.scores.significance > 8).slice(0, 10)

  if (posts === undefined) {
    throw new Error("`posts` is undefined")
  }

  console.log(`Fetched ${posts.length} posts`)

  // TODO: Handle case where there are no posts

  const eligibleUsers = await prisma.user.findMany({
    where: {
      AND: [
        { OR: [{ stripeSubscriptionStatus: "active" }, { stripeSubscriptionStatus: "trialing" }] },
        { optedOutNewsletter: false },
      ],
    },
  })

  console.log(`Sending emails to ${eligibleUsers.length} users`)

  // Read the Handlebars template
  fs.readFile(path.join(__dirname, "..", templatePath), "utf8", (err, templateString) => {
    if (err) throw err

    // Compile the template
    const template = handlebars.compile(templateString)

    const dateString = postsDate.toLocaleDateString()

    // Generate HTML using the fetched posts
    const html = template({ posts, date: dateString })

    // Prepare an array of messages
    const emails: EmailData[] = eligibleUsers.map((user: User) => ({
      name: user.name ?? "",
      email: user.email!,
    }))

    const message: MailDataRequired = {
      from: {
        email: process.env.EMAIL_FROM!,
        name: "Alpha Feed Gist",
      },
      personalizations: emails.map((email) => ({ to: [email] })),
      subject: `Daily Digest for ${dateString}`,
      html,
      text: generatePlainText(posts),
    }

    if (process.env.MOCK) {
      console.log("MOCK MODE: not sending emails")
      return
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
