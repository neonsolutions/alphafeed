import Image from "next/image"
import Link from "next/link"
import Footer from "../components/Footer"
import { CheckIcon } from "@heroicons/react/20/solid"
import logoWithText from "../../public/images/logoWithText.svg"
import infographic from "../../public/images/landing/infographic.svg"

const includedFeatures = ["Access to past articles", "Personalized feed", "Daily summary email", "Priority updates"]

export default function landing() {
  return (
    <div>
      <div className="bg-white z-0 h-screen">
        <header className="absolute inset-x-0 top-0 z-50">
          <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>

                <Image src={logoWithText} alt="logoWithText" height={30} />
              </a>
            </div>
            <div className=" lg:flex lg:flex-1 lg:justify-end">
              <Link href="/home">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  Log in
                  <span aria-hidden="true">&rarr;</span>
                </div>
              </Link>
            </div>
          </nav>
        </header>

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
          <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-56">
            <div className="text-center ">
              <h1 className="text-4xl font-bold leading-tight  text-gray-900 sm:text-6xl">
                Your AI-Powered News
                <span className=" text-indigo-500 leading-tight"> Aggregator for Everything AI</span>
              </h1>

              <div className="flex justify-center w-full">
                {" "}
                <p className="mt-10 text-lg max-w-sm leading-normal  text-gray-600">
                  AI moves fast, we keep you up to date and sift through the noise so you don't have to.
                </p>
              </div>

              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
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
      <div className="bg-white w-full py-32  border-t-2 border-gray-200 z-10 relative text-black h-full flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 w-full max-w-4xl">
          <div className="flex justify-center items-start px-6 order-2 sm:order-1 sm:pt-0 pt-14">
            <Image src={infographic} alt="infographic"></Image>
          </div>
          <div className="flex justify-center content-center px-6 order-1 sm:order-2">
            <div>
              <h2 className="text-3xl font-bold leading-tight  text-gray-900 sm:text-4xl  pb-10">How It Works</h2>
              <div className="max-w-[420px] sm:max-w-[380]">
                <p className="text-gray-900 font-medium text-lg">Discover</p>
                <p className="text-gray-600  text-base">
                  AI algorithms scan thousands of news sources, blogs, forums, and academic journals, identifying the
                  latest and most relevant AI news
                </p>
                <p className="text-gray-900 font-medium text-lg pt-4">Analyse</p>
                <p className="text-gray-600  text-base">
                  Our AI evaluates each piece of content, analysing its relevance and insightfulness. It filters out the
                  noise, leaving only the most valuable information.
                </p>
                <p className="text-gray-900 font-medium text-lg pt-4">Personalise</p>
                <p className="text-gray-600  text-base">
                  Alpha learns from your reading habits and preferences, tailoring its content curation to your unique
                  interests. The more you use Alpha
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className="px-6 lg:px-8 py-32  border-t-2 border-gray-200 flex justify-center ">
        <div>
          <h2 className="text-3xl font-bold leading-tight  text-gray-900 sm:text-4xl   text-center pb-14">Pricing</h2>
          <div className="mx-auto max-w-3xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-[840px]">
            <div className="p-8 sm:p-10 lg:flex-auto sm:max-w-[550px]">
              <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">All-Access Subscription</h3>
              <p className="mt-6 text-base leading-5 text-gray-600">
                Unlock the full power of Alpha with our All-Access Subscription. Stay ahead of the AI curve with
                unlimited access to curated content, personalized recommendations, and exclusive features.
              </p>
              <div className="mt-10 flex items-center gap-x-4">
                <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-500">What’s included</h4>
                <div className="h-px flex-auto bg-gray-100" />
              </div>
              <ul
                role="list"
                className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 text-sm leading-6 text-gray-600 sm:grid-cols-2 "
              >
                {includedFeatures.map((feature) => (
                  <li key={feature} className="flex gap-x-2">
                    <CheckIcon className="h-6 w-5 flex-none text-indigo-500" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:min-w-[300px] lg:max-w-md lg:flex-shrink-0 ">
              <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 h-full ">
                <div className="mx-auto max-w-xs px-8 w-full">
                  <p className="text-base font-semibold text-gray-600">Monthly fee</p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">$2</span>
                    <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                  </p>
                  <button className="mt-10  w-full rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
                    {" "}
                    Get access
                  </button>
                  <p className="mt-6 text-xs leading-5 text-gray-600">Cancle anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}
