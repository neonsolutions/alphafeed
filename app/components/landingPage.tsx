import Image from "next/image"
import Link from "next/link"
import { useState, useRef } from "react"
import { IPriceIds } from "../interfaces/IPriceIds"
import infographic from "../public/images/landing/infographic.svg"
import infographicDark from "../public/images/landing/infographicDark.svg"
import Pricing from "./Pricing"
import { useRouter } from "next/router"

export default function landingPage({
  yearlyPriceId,
  monthlyPriceId,
  hasSubscription,
}: IPriceIds & { hasSubscription: boolean }) {
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
    <div className="bg-white dark:bg-black">
      <div className=" z-0 h-[90vh]">
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
          <div className="mx-auto max-w-4xl flex justify-center items-center h-[70vh]">
            <div className="text-center ">
              <h1 className="text-4xl font-bold leading-tight  text-gray-900 dark:text-white sm:text-6xl">
                Your AI-Powered News
                <span className=" text-indigo-500 leading-tight"> Aggregator for Everything AI</span>
              </h1>
              <div className="flex justify-center w-full">
                <p className="mt-10 text-lg max-w-sm leading-normal  text-gray-600 dark:text-gray-500">
                  AI moves fast, we keep you up to date and sift through the noise so you don't have to.
                </p>
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/feed"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
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
        className="bg-white dark:bg-black w-full py-32  border-t-2 border-gray-200 dark:border-gray-800 z-10 relative text-black h-full flex justify-center"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl">
          <div className="flex justify-center items-start px-6 order-2 sm:order-1 sm:pt-0 pt-14">
            <Image src={infographic} alt="infographic" className="dark:hidden"></Image>
            <Image src={infographicDark} alt="infographic" className="hidden dark:block"></Image>
          </div>
          <div className="flex justify-center content-center px-6 order-1 sm:order-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight  text-gray-900 dark:text-white sm:text-4xl  pb-6">
                How It Works
              </h2>
              <div className="max-w-[420px] sm:max-w-[380]">
                <p className="text-gray-900 dark:text-white font-medium text-lg">Discover</p>
                <p className="text-gray-600 dark:text-gray-400  text-base">
                  AI algorithms scan thousands of news sources, blogs, forums, and academic journals, identifying the
                  latest and most relevant AI news
                </p>
                <p className="text-gray-900 dark:text-white  font-medium text-lg pt-4">Analyse</p>
                <p className="text-gray-600  dark:text-gray-400  text-base">
                  Our AI evaluates each piece of content, analysing its relevance and insightfulness. It filters out the
                  noise, leaving only the most valuable information.
                </p>
                <p className="text-gray-900 dark:text-white font-medium text-lg pt-4">Personalise</p>
                <p className="text-gray-600 dark:text-gray-400  text-base">
                  Alpha learns from your reading habits and preferences, tailoring its content curation to your unique
                  interests. The more you use Alpha
                </p>
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
            monthlyPrice={2}
            yearlyPriceId={yearlyPriceId}
            yearlyPrice={20}
            setSubscriptionType={setSubscriptionType}
            hasSubscription={hasSubscription}
          />
        </div>
      </div>
    </div>
  )
}
