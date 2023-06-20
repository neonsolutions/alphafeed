import { CheckIcon } from "@heroicons/react/20/solid"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { getStripe } from "../utils/stripe-client"

const includedFeatures = ["AI filtered feed", "Daily summary email", "Priority updates", "Access to past articles"]

interface IPricing {
  monthlyPrice: number
  yearlyPrice: number
  monthlyPriceId: string
  yearlyPriceId: string
  setSubscriptionType: (type: string) => void
  user: Session["user"]
}

const postData = async ({ url, data }: { url: string; data?: { priceId: string } }) => {
  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    console.log("Error in postData", { url, data, res })

    throw Error(res.statusText)
  }

  return res.json()
}

export default function Pricing({
  monthlyPrice,
  yearlyPrice,
  setSubscriptionType,
  monthlyPriceId,
  yearlyPriceId,
  user,
}: IPricing) {
  const { data: session } = useSession()
  const router = useRouter()
  const [isYearly, setIsYearly] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleCheckout = async (priceId: string) => {
    setIsLoading(true) // set loading state to true
    if (!session?.user) {
      setIsLoading(false)
      return router.push("/login")
    }

    try {
      const { sessionId } = await postData({
        url: "/api/payment/create-checkout-session",
        data: { priceId },
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      setIsLoading(false) // set loading state to false in case of error
      return alert((error as Error)?.message)
    } finally {
      // setPriceIdLoading(undefined)
      setIsLoading(false) // set loading state to false once the request is complete
    }
  }

  const redirectToCustomerPortal = async () => {
    // setLoading(true);
    try {
      setIsLoading(true)
      const { url, error } = await postData({
        url: "/api/payment/create-portal-link",
      })
      window.location.assign(url)
    } catch (error) {
      setIsLoading(false)
      if (error) return alert((error as Error).message)
    }
    // setLoading(false);
  }

  useEffect(() => {
    setSubscriptionType(isYearly ? "yearly" : "monthly")
  }, [isYearly])

  function calculateDiscount(monthlyPrice: number, yearlyPrice: number): number {
    const totalMonthlyPriceForYear = monthlyPrice * 12
    const savings = totalMonthlyPriceForYear - yearlyPrice
    const discountPercentage = (savings / totalMonthlyPriceForYear) * 100
    return Math.round(discountPercentage)
  }

  return (
    <div>
      <div className="w-full flex justify-center pt-10 pb-5">
        <span
          className={`ml-3 text-sm pr-3 font-medium  ${
            !isYearly ? " text-gray-900 dark:text-white" : " text-gray-500 bg:text-gray-100"
          }`}
        >
          Monthly
        </span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => setIsYearly(!isYearly)}
            checked={isYearly}
          ></input>
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
        <span
          className={`ml-3 text-sm pr-3 font-medium ${
            isYearly ? " text-gray-900 dark:text-white" : " text-gray-500 bg:text-gray-100"
          }`}
        >
          Yearly
        </span>
      </div>
      <div className="mx-auto max-w-3xl rounded-3xl ring-1 ring-gray-200 dark:ring-gray-800 lg:mx-0 lg:flex lg:max-w-[840px]">
        <div className="p-8 sm:p-10 lg:flex-auto sm:max-w-[550px]">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            All-Access Subscription
          </h3>
          <p className="mt-6 text-base leading-5 text-gray-600 dark:text-gray-400">
            Alpha Feed delivers AI-curated, quality content directly to you. No fluff. No noise.
          </p>
          <div className="mt-10 flex items-center gap-x-4">
            <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-500">What’s included</h4>
            <div className="h-px flex-auto bg-gray-100" />
          </div>
          <ul
            role="list"
            className="mt-8 grid grid-cols-1 gap-4 sm:gap-6 text-sm leading-6 text-gray-600 dark:text-gray-500 sm:grid-cols-2 "
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
          <div className="rounded-2xl bg-gray-50 dark:bg-gray-950 py-10 text-center ring-1 ring-inset ring-gray-900/5  lg:flex lg:flex-col lg:justify-center lg:py-10 h-full ">
            <div className="mx-auto max-w-xs px-8 w-full">
              <div className="flex w-full justify-center">
                <p className="text-base font-semibold text-gray-600  dark:text-gray-300">
                  {!isYearly ? "Monthly fee" : "Yearly fee"}
                </p>
                {isYearly && (
                  <span className="flex  items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ml-2">
                    -{calculateDiscount(monthlyPrice, yearlyPrice)}%
                  </span>
                )}
              </div>
              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
                  ${!isYearly ? monthlyPrice.toFixed(2) : yearlyPrice}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600 dark:text-gray-400">
                  USD
                </span>
              </p>
              <button
                onClick={() =>
                  !user?.hasActiveSubscription
                    ? handleCheckout(isYearly ? yearlyPriceId : monthlyPriceId)
                    : redirectToCustomerPortal()
                }
                className="mt-10  w-full rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex justify-center items-center disabled:bg-gray-400"
              >
                {isLoading ? (
                  <svg
                    className="animate-spin  h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : user?.hasActiveSubscription ? (
                  "Manage subscription"
                ) : (
                  "Get access"
                )}
              </button>
              {!user?.stripeSubscriptionId && (
                <>
                  <p className="mt-5 text-[14px] leading-5 text-gray-600 dark:text-gray-400 font-bold">
                    7 day free trial
                  </p>
                  <p className="mt-1 text-[14px] leading-5 text-gray-600 dark:text-gray-400 font-bold">
                    No card required
                  </p>
                </>
              )}

              <p className="mt-2 text-xs leading-5 text-gray-600 dark:text-gray-400">Cancel anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
