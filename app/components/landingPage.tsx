import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import { IPriceIds } from "../interfaces/IPriceIds"
import Pricing from "./Pricing"
import { useRouter } from "next/router"
import { Session } from "next-auth"
import PhoneFeedDemo from "./PhoneFeedDemo"

export default function landingPage({ yearlyPriceId, monthlyPriceId, user }: IPriceIds & { user: Session["user"] }) {
  const [subscriptionType, setSubscriptionType] = useState("monthly")
  const howItWorksRef = useRef<HTMLDivElement>(null)

  const handleLearnMoreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (howItWorksRef.current) {
      window.scrollTo({
        top: howItWorksRef.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="bg-white dark:bg-black transition-colors duration-500 ">
      <div className=" z-0  sm:h-[90vh] h-[75vh]">
        <div className="relative isolate px-6 pt-14 lg:px-8">
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
          <div className="mx-auto max-w-5xl block justify-center sm:flex  items-center h-[70vh]">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold leading-tight  text-gray-900 dark:text-white sm:text-6xl">
                From Endless Scrolling to Effortless Knowing.
              </h1>
              <div className="">
                <p className="mt-10 text-lg max-w-m leading-normal  text-gray-600 dark:text-gray-500">
                  Cut out the noise and surface the most significant AI related news of the day.
                </p>
              </div>
              <div className="mt-10 flex items-center sm:justify-start justify-center gap-x-6">
                <Link
                  href="/feed"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {user?.stripeSubscriptionId ? "Go to Feed" : "Start your 7-day free trial"}
                </Link>
                <a
                  href="#"
                  onClick={handleLearnMoreClick}
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                >
                  Learn more
                </a>
              </div>
            </div>
            <div className="sm:mr-10 mr-0 sm:ml-10 ml-0 pt-10 sm:pt-0 sm:w-auto w-full sm:flex flex justify-center">
              <PhoneFeedDemo />
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
      {/* How It Works */}
      <div
        ref={howItWorksRef}
        className=" w-full py-32  border-t-2 border-gray-200 dark:border-gray-800 z-10 relative text-black h-full flex justify-center transition-colors duration-500 bg-white dark:bg-black"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl">
          <div className="flex justify-center items-start px-6 order-2 sm:order-1 sm:pt-0 pt-14">
            <Image
              src="/images/landing/infographic.svg"
              width={300}
              height={200}
              alt="infographic"
              className="dark:hidden"
            ></Image>
            <Image
              src="/images/landing/infographicDark.svg"
              width={300}
              height={200}
              alt="infographic"
              className="hidden dark:block"
            ></Image>
          </div>
          <div className="flex justify-center content-center px-6 order-1 sm:order-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight  text-gray-900 dark:text-white sm:text-4xl  pb-6">
                How It Works
              </h2>
              <div className="max-w-[420px] sm:max-w-[380]">
                <p className="text-gray-900 dark:text-white font-medium text-lg">Discover</p>
                <p className="text-gray-600 dark:text-gray-400  text-base">
                  We ingest content from various curated sources at the cutting edge of machine learning.
                </p>
                <p className="text-gray-900 dark:text-white  font-medium text-lg pt-4">Analyze</p>
                <p className="text-gray-600  dark:text-gray-400  text-base">
                  Our AI evaluates every piece of content on various metrics from relevance to reliability to determine
                  its significance.
                </p>
                <p className="text-gray-900 dark:text-white font-medium text-lg pt-4">Feed</p>
                <p className="text-gray-600 dark:text-gray-400  text-base">
                  The resulting feed contains the most important developments, saving you hours of endless scrolling
                  every day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feed Demo */}

      <div
        ref={howItWorksRef}
        className=" w-full py-32  border-t-2 border-gray-200 dark:border-gray-800 z-10 relative text-black  transition-colors duration-500 bg-white dark:bg-black"
      >
        <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl text-center">
          Everything you should know{" "}
        </h2>
        <h4 className="text-gray-600 dark:text-gray-400  text-base text-center pt-3">
          Delivered daily and available on-demand
        </h4>
        <div className="h-full flex justify-center pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl">
            <div className="flex justify-center  px-6 order-2 sm:order-1 sm:pt-0 auto">
              <div>
                <h3 className="text-xl sm:text-xl leading-tight text-gray-900 dark:text-white text-center pb-2 pt-10 sm:pt-0">
                  Web
                </h3>
                <PhoneFeedDemo />
              </div>
            </div>

            <div className="flex justify-center content-center px-6 order-1 sm:order-2">
              <div>
                <h3 className="text-xl sm:text-xl leading-tight text-gray-900 dark:text-white text-center pb-2">
                  Newsletter
                </h3>
                <Image alt="iphoneEmailFeed" src="/images/landing/iphoneEmailFeed.png" width={220} height={780}></Image>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-6 lg:px-8 pt-32 pb-40  border-t-2 border-gray-200 dark:border-gray-800 flex justify-center ">
        <div>
          <h2 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white sm:text-4xl text-center">
            Pricing
          </h2>
          <Pricing
            monthlyPriceId={monthlyPriceId}
            monthlyPrice={2.5}
            yearlyPriceId={yearlyPriceId}
            yearlyPrice={25}
            setSubscriptionType={setSubscriptionType}
            user={user}
          />
        </div>
      </div>
    </div>
  )
}
