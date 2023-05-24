import Image from "next/image"
import Link from "next/link"
import FeedCard from "../components/FeedCard"

const mockData = [
  {
    title: "Amazing Twitter Post",
    body: "This is an amazing Twitter post that you should check out!",
    ranking: 1,
    media: "https://via.placeholder.com/150",
    mediaType: "twitter" as const,
    link: "https://www.twitter.com",
  },
  {
    title: "Interesting News Article",
    body: "Here's an interesting news article that we found. Have a read!",
    ranking: 2,
    media: "https://via.placeholder.com/150",
    mediaType: "news" as const,
    link: "https://www.newswebsite.com",
  },
  {
    title: "Intriguing Research Paper",
    body: "This research paper presents some groundbreaking findings. Take a look!",
    ranking: 3,
    media: "https://via.placeholder.com/150",
    mediaType: "research" as const,
    link: "https://www.researchwebsite.com",
  },
]

const Feed = () => {
  return (
    <div>
      <div className="relative isolate px-6 pt-44 lg:px-8 w-full flex justify-center ">
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
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold  text-gray-900 sm:text-4xl">The latest in AI</h1>
            <div className="w-10">
              <div className="h-[18px] bg-indigo-300 rounded-t-md w-full text-center flex justify-center items-center">
                <p className="font-bold text-[10px]">MAY</p>
              </div>
              <div className="h-6 bg-indigo-100 rounded-b-md w-full text-center flex justify-center items-center">
                <p className="font-bold text-sm text-gray-900">31</p>
              </div>
            </div>
          </div>
          <div>
            {mockData.map((post, index) => (
              <FeedCard
                key={index}
                title={post.title}
                body={post.body}
                ranking={post.ranking}
                media={post.media}
                mediaType={post.mediaType}
                link={post.link}
              />
            ))}
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
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
