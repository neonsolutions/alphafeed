import { feed_items, scores } from "@prisma/client"
import { prisma } from "../lib/prisma"
import { IFeedPost, SourceType } from "../interfaces/IFeedPost"
import { extractMediaSources, extractLinks } from "../utils/feed-helpers"

type feed_items_with_scores = feed_items & {
  scores: scores | null
}

export async function getPostsForDate(date: Date): Promise<IFeedPost[] | undefined> {
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
    })

    const parsedPosts = parseFeedItems(posts)

    return parsedPosts
  } catch (error) {
    console.error("Error fetching posts for specific date: ", error)
  }
}

function parseFeedItems(feedItems: feed_items_with_scores[]): IFeedPost[] {
  const parsedPosts: IFeedPost[] = feedItems
    .map((post) => {
      const scores = post.scores! // Filtering out nulls
      const significance = Math.round(((scores.impact + scores.novelty + scores.relevance) / 3) * 10) / 10

      const media = extractMediaSources(post.description_raw)
      const externalLinks = extractLinks(post.description_raw).filter((link) => !media.includes(link))

      return {
        title: post.title || post.title_raw,
        body: post.description || post.description_raw,
        significance: significance,
        scores: {
          significance,
          relevance: scores.relevance,
          impact: scores.impact,
          novelty: scores.novelty,
          reliability: scores.reliability,
        },
        media: media,
        externalLinks: externalLinks,
        source: SourceType.Twitter,
        link: post.link.replace("nitter.net", "twitter.com"),
        publishedAt: post.published.toISOString(),
      }
    })
    .sort((a: IFeedPost, b: IFeedPost) => b.scores.significance - a.scores.significance)

  return parsedPosts
}
