import { prisma } from "./db"

export async function getPostsForDate(date: Date) {
  // Create datetime boundaries for start and end of the day
  let start = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
  let end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)

  try {
    const posts = await prisma.feed_items.findMany({
      where: {
        published: {
          gte: start,
          lte: end,
        },
        scores: {
          isNot: null,
        },
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