import { feed_items, scores } from "@prisma/client"
import { prisma } from "./db"

const threeHoursAgo = new Date()
threeHoursAgo.setHours(threeHoursAgo.getHours() - 3)

const twentyMinutesAgo = new Date()
twentyMinutesAgo.setMinutes(twentyMinutesAgo.getMinutes() - 20)

const onePointThreeDaysAgo = new Date()
onePointThreeDaysAgo.setDate(onePointThreeDaysAgo.getDate() - 1.3)

const mockData = [
  {
    title: "Amazing Twitter Post",
    body: "A groundbreaking study reveals how AI is transforming healthcare diagnostics. The research, conducted by a team of scientists at MIT, demonstrates how AI can accurately diagnose certain medical conditions faster than human doctors. This breakthrough could potentially save millions of lives and revolutionize the healthcare industry.",
    scores: { significance: 9, relevance: 1, impact: 9, novelty: 5, reliability: 2 },
    media: [
      "https://picsum.photos/200/300",
      "https://source.unsplash.com/random/200x300",
      "https://source.unsplash.com/random/200x300",
    ], // Placeholder image from Lorem Picsum&#8203;`oaicite:{"index":0,"metadata":{"title":"Lorem Picsum","url":"https://picsum.photos/","text":"https://picsum.photos/200/300. To get a square image, just add the size. https://picsum.photos/200. Specifi","pub_date":null}}`&#8203;
    mediaType: "twitter",
    link: "https://www.twitter.com",
    date: threeHoursAgo,
  },
  {
    title: "Interesting News Article",
    body: "demonstrates how AI can accurately diagnose certain medical conditions faster than human doctors. This breakthrough could potentially save millions of lives and revolutionize the healthcare industry.",
    scores: { significance: 8, relevance: 2, impact: 2, novelty: 3, reliability: 3 },
    media: [
      "https://source.unsplash.com/random/200x300",
      "https://source.unsplash.com/random/200x300",
      "https://source.unsplash.com/random/200x300",
    ], // Random image from Unsplash&#8203;`oaicite:{"index":1,"metadata":{"title":"awik.io","url":"https://awik.io/generate-random-images-unsplash-without-using-api/","text":"https://source.unsplash.com/random/WIDTHxHEIGHT\n\nLet’s generate a random image with the width and height of 300px:\n\nhttps://source.unsplash.com/random/300×300","pub_date":null}}`&#8203;
    mediaType: "news",
    link: "https://www.newswebsite.com",
    date: twentyMinutesAgo,
  },
  {
    title: "Intriguing Research Paper",
    body: "This research paper presents some groundbreaking findings. Take a look!",
    scores: { significance: 7, relevance: 2, impact: 2, novelty: 3, reliability: 3 },
    mediaType: "research",
    link: "https://www.researchwebsite.com",
    date: onePointThreeDaysAgo,
  },
  {
    title: "Intriguing Research Paper",
    body: "This research paper presents some groundbreaking findings. Take a look!",
    scores: { significance: 7, relevance: 2, impact: 2, novelty: 3, reliability: 3 },
    mediaType: "internet",
    link: "https://www.researchwebsite.com",
    date: onePointThreeDaysAgo,
  },
]

export async function getPostsForDate(date: Date): Promise<
  | (feed_items & {
      scores: scores | null
    })[]
  | undefined
> {
  return mockData // TODO: Update this to conform to return type

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
