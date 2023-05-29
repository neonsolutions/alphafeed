import { PrismaClient } from "@prisma/client"
import dayjs from "dayjs"
import Parser from "rss-parser"

const prisma = new PrismaClient()

async function main() {
  console.log("Fetching RSS feed")
  const parser = new Parser()
  const feed = await parser.parseURL("https://nitter.net/i/lists/1660595980486492162/rss")

  console.log(`Processing ${feed.items.length} items`)

  let insertedCount = 0
  let skippedCount = 0

  for (const item of feed.items) {
    const parsedTime = dayjs(item.pubdate).toDate()

    try {
      await prisma.feed_items.create({
        data: {
          title_raw: item.title!,
          link: item.link!,
          description_raw: item.content!,
          published: parsedTime,
          author: item.creator!,
        },
      })
      insertedCount += 1
    } catch (error) {
      // console.error(error)
      skippedCount += 1
    }
  }

  console.log(`Inserted ${insertedCount} items, skipped ${skippedCount} items`)
}

main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
