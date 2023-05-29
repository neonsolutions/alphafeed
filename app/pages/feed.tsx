import { ArrowSmallLeftIcon, ArrowSmallRightIcon } from "@heroicons/react/24/solid"
import { GetServerSidePropsContext } from "next"
import { getServerSession } from "next-auth"
import Head from "next/head"
import { useRouter } from "next/router"
import FeedCard from "../components/FeedCard"
import { IFeedPost } from "../interfaces/IFeedPost"
import { getPostsForDate } from "../lib/feed"
import { authOptions } from "./api/auth/[...nextauth]"

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  const redirectToLogin = {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  }

  if (!session || !session.user || !session.user.email) {
    console.log("No session found")
    return redirectToLogin
  }

  if (!session.user.hasActiveSubscription) {
    // TODO: Handle other subscription statuses
    console.log("User has no active subscription")
    return {
      redirect: {
        destination: "/subscribe",
        permanent: false,
      },
    }
  }

  let date = context.query.date as string

  if (!date) {
    console.log("Date not provided in query parameters")
    date = new Date().toISOString().split("T")[0]
  }

  const redirectToToday = {
    redirect: {
      destination: `/feed?date=${date}`,
      permanent: false,
    },
  }

  let dateObj
  try {
    dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date")
    }
  } catch (error) {
    console.error("Invalid date provided:", date)
    return redirectToToday
  }

  let currentDate = new Date()
  currentDate.setHours(23, 59, 59, 999) // Set to end of the day

  if (dateObj > currentDate) {
    console.log("Future date provided, reverting to current date:", date)
    date = currentDate.toISOString().split("T")[0] // Set date to current date
    dateObj = new Date(date)
    return redirectToToday
  }

  const posts = (await getPostsForDate(dateObj))?.sort(
    (a: IFeedPost, b: IFeedPost) => b.scores.significance - a.scores.significance,
  )

  console.log(JSON.stringify(posts?.slice(0, 5)))

  if (!posts) {
    return { props: { posts: [], session } }
  }

  return { props: { posts, session } }
}

const Feed = ({ posts }: { posts: IFeedPost[] }) => {
  const router = useRouter()
  const { date } = router.query

  const getCurrentMonth = (): string => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
    const currentDate = date ? new Date(date as string) : new Date()
    return monthNames[currentDate.getMonth()]
  }

  const getCurrentDay = (): number => {
    const currentDate = date ? new Date(date as string) : new Date()
    return currentDate.getDate()
  }

  const getCurrentDate = (): string => {
    const currentDate = new Date()
    return currentDate.toISOString().split("T")[0]
  }

  return (
    <>
      <Head>
        <title>Feed - Alpha Feed</title>
      </Head>
      <div className="bg-white dark:bg-black">
        <div className="relative isolate px-6 pt-14 sm:pt-20 lg:px-8 w-full flex justify-center pb-32 ">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative sm:left-[calc(50%-3rem)]  left-[calc(3rem)] aspect-[1155/678] w-[36.125rem] sm:-translate-x-[44%] translate-y-[80%] sm:translate-y-[10%] rotate-[0deg] sm:rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:opacity-20  sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="w-full max-w-[500px] ">
            <div className="flex justify-between pb-6">
              <h1 className="text-2xl font-bold  text-gray-900 dark:text-white sm:text-4xl">The latest in AI</h1>
              <div className="flex justify-between items-center transition-transform">
                <button
                  onClick={() => {
                    const currentDate = date ? new Date(date as string) : new Date()
                    currentDate.setDate(currentDate.getDate() - 1)
                    router.push(`/feed?date=${currentDate.toISOString().split("T")[0]}`)
                  }}
                >
                  <ArrowSmallLeftIcon className="text-gray-500 hover:text-gray-400 mr-1" width={20} height={20} />
                </button>
                <div className="w-10 -mt-1">
                  <div className="h-[18px] bg-indigo-300 rounded-t-md w-full text-center flex justify-center items-center">
                    <p className="font-bold text-[10px]">{getCurrentMonth()}</p>
                  </div>
                  <div className="h-6 bg-indigo-100 rounded-b-md w-full text-center flex justify-center items-center">
                    <p className="font-bold text-sm text-gray-900">{getCurrentDay()}</p>
                  </div>
                </div>
                {getCurrentDate() !== date && (
                  <button
                    onClick={() => {
                      const currentDate = date ? new Date(date as string) : new Date()
                      currentDate.setDate(currentDate.getDate() + 1)
                      router.push(`/feed?date=${currentDate.toISOString().split("T")[0]}`)
                    }}
                  >
                    <ArrowSmallRightIcon className="text-gray-500 hover:text-gray-400 ml-1" width={20} height={20} />
                  </button>
                )}
              </div>
            </div>
            {posts.length > 0 ? (
              <div>
                {posts.map((post, index) => (
                  <FeedCard {...post} key={index} />
                ))}
              </div>
            ) : (
              <h1 className="text-lg text-gray-400 font-medium text-center mt-8">
                Sorry, no posts passed our filters today.
              </h1>
            )}
          </div>
          <div
            className="absolute inset-x-0 top-[calc(0%)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(40%)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:opacity-20 sm:left-[calc(30%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed
