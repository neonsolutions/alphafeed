import { feed_items, scores } from "@prisma/client"
import { prisma } from "./db"

export async function getPostsForDate(date: Date): Promise<
  | (feed_items & {
      scores: scores | null
    })[]
  | undefined
> {
  // Create datetime boundaries for start and end of the day
  let start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)

  try {
    const posts = await prisma.feed_items.findMany({
      where: {
        AND: [
          {
            published: {
              gte: start,
              lte: end,
            },
          },
          {
            scores: {
              isNot: null,
            },
          },
          {
            scores: {
              relevance: { gt: 7 },
            },
          },
        ],
      },
      include: {
        scores: true,
      },
      orderBy: {
        scores: {
          novelty: "desc",
        },
      },
    })

    return posts
  } catch (error) {
    console.error("Error fetching posts for specific date: ", error)
  }
}
