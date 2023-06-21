import { feed_items, scores } from "@prisma/client"
import { prisma } from "../lib/prisma"
import { IFeedPost, SourceType } from "../interfaces/IFeedPost"
import { extractMediaSources, extractLinks } from "../utils/feed-helpers"
import { computeSignificance } from "../utils/eval"

type feed_items_with_scores = feed_items & {
  scores: scores | null
}

export async function getPostsForDate(
  date: Date,
  limit: number | undefined = undefined,
): Promise<IFeedPost[] | undefined> {
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
            AND: [
              {
                scores: {
                  relevance: { gt: 7 },
                },
              },
              {
                scores: {
                  novelty: { gt: 7 },
                },
              },
              {
                scores: {
                  impact: { gt: 7 },
                },
              },
            ],
          },
        ],
      },
      include: {
        scores: true,
      },
      orderBy: {
        scores: {
          relevance: "desc",
        },
      },
    })

    const sortedFeedItems = posts.sort((a, b) => {
      const avgScoreA = (a.scores!.relevance + a.scores!.impact + a.scores!.novelty) / 3
      const avgScoreB = (b.scores!.relevance + b.scores!.impact + b.scores!.novelty) / 3
      return avgScoreB - avgScoreA // for descending order
    })

    const parsedPosts = parseFeedItems(sortedFeedItems, limit)

    return parsedPosts
  } catch (error) {
    console.error("Error fetching posts for specific date: ", error)
  }
}

function parseFeedItems(feedItems: feed_items_with_scores[], limit: number | undefined = undefined): IFeedPost[] {
  const parsedPosts: IFeedPost[] = feedItems
    .map((post) => {
      const scores = post.scores! // Filtering out nulls
      const rawSignificance = computeSignificance(scores)
      const significance = Math.round(rawSignificance * 10) / 10

      const media = extractMediaSources(post.description_raw)
      let externalLinks = extractLinks(post.description_raw)
      externalLinks = externalLinks
        .filter((link) => !media.images.includes(link) && !media.videos.includes(link))
        .map((link) => link.replace("nitter.net", "twitter.com"))

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
    // .sort((a: IFeedPost, b: IFeedPost) => b.scores.significance - a.scores.significance)
    .slice(0, limit || feedItems.length)

  return parsedPosts
}
