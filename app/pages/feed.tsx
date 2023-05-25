import FeedCard from "../components/FeedCard"
import { IFeedPost, SourceType } from "../interfaces/IFeedPost"
import { getPostsForDate } from "../lib/feed"

const threeHoursAgo = new Date()
threeHoursAgo.setHours(threeHoursAgo.getHours() - 3)

const twentyMinutesAgo = new Date()
twentyMinutesAgo.setMinutes(twentyMinutesAgo.getMinutes() - 20)

const onePointThreeDaysAgo = new Date()
onePointThreeDaysAgo.setDate(onePointThreeDaysAgo.getDate() - 1.3)

const mockData: IFeedPost[] = [
  {
    title: "Amazing Twitter Post",
    body: "A groundbreaking study reveals how AI is transforming healthcare diagnostics. The research, conducted by a team of scientists at MIT, demonstrates how AI can accurately diagnose certain medical conditions faster than human doctors. This breakthrough could potentially save millions of lives and revolutionize the healthcare industry.",
    scores: { significance: 9, relevance: 1, impact: 9, novelty: 5, reliability: 2 },
    media: [
      "https://picsum.photos/200/300",
      "https://source.unsplash.com/random/200x300",
      "https://source.unsplash.com/random/200x300",
    ], // Placeholder image from Lorem Picsum&#8203;`oaicite:{"index":0,"metadata":{"title":"Lorem Picsum","url":"https://picsum.photos/","text":"https://picsum.photos/200/300. To get a square image, just add the size. https://picsum.photos/200. Specifi","pub_date":null}}`&#8203;
    source: SourceType.Twitter,
    link: "https://www.twitter.com",
    publishedAt: threeHoursAgo.toISOString(),
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
    source: SourceType.News,
    link: "https://www.newswebsite.com",
    publishedAt: twentyMinutesAgo.toISOString(),
  },
  {
    title: "Intriguing Research Paper",
    body: "This research paper presents some groundbreaking findings. Take a look!",
    scores: { significance: 7, relevance: 2, impact: 2, novelty: 3, reliability: 3 },
    source: SourceType.Research,
    media: null,
    link: "https://www.researchwebsite.com",
    publishedAt: onePointThreeDaysAgo.toISOString(),
  },
  {
    title: "Intriguing Research Paper",
    body: "This research paper presents some groundbreaking findings. Take a look!",
    scores: { significance: 7, relevance: 2, impact: 2, novelty: 3, reliability: 3 },
    source: SourceType.Research,
    media: null,
    link: "https://www.researchwebsite.com",
    publishedAt: onePointThreeDaysAgo.toISOString(),
  },
]

export const getServerSideProps = async () => {
  return { props: { posts: mockData } }

  const posts = await getPostsForDate(new Date())
  console.log(posts)
  if (!posts) {
    return { props: { posts: [] } }
  }
  const parsedPosts: IFeedPost[] = posts!.map((post) => {
    const scores = post.scores! // Filtering out nulls
    const significance = (scores.impact + scores.novelty + scores.relevance) / 3
    return {
      title: post.title,
      body: post.description,
      significance: significance,
      scores: {
        significance,
        relevance: scores.relevance,
        impact: scores.impact,
        novelty: scores.novelty,
        reliability: scores.reliability,
      },
      media: null,
      source: SourceType.Twitter,
      link: post.link,
      publishedAt: post.published.toISOString(),
    }
  })

  return { props: { posts: parsedPosts } }
}

const Feed = ({ posts }: { posts: IFeedPost[] }) => {
  return (
    <div>
      <div className="relative isolate px-6 pt-14 sm:pt-20 lg:px-8 w-full flex justify-center pb-32">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="w-full max-w-[500px] ">
          <div className="flex justify-between pb-6">
            <h1 className="text-2xl font-bold  text-gray-900 sm:text-4xl">The latest in AI</h1>
            <div className="w-10 -mt-1">
              <div className="h-[18px] bg-indigo-300 rounded-t-md w-full text-center flex justify-center items-center">
                <p className="font-bold text-[10px]">MAY</p>
              </div>
              <div className="h-6 bg-indigo-100 rounded-b-md w-full text-center flex justify-center items-center">
                <p className="font-bold text-sm text-gray-900">31</p>
              </div>
            </div>
          </div>
          <div>
            {posts.map((post, index) => (
              <FeedCard {...post} key={index} />
            ))}
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(50%)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(60%)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Feed
