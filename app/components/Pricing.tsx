import React, { useState, useEffect } from "react"
import { CheckIcon } from "@heroicons/react/20/solid"

const includedFeatures = ["Access to past articles", "Personalized feed", "Daily summary email", "Priority updates"]

interface IPricing {
  monthlyPrice: number
  yearlyPrice: number
  setSubscriptionType: (type: string) => void
}

export default function Pricing({ monthlyPrice, yearlyPrice, setSubscriptionType }: IPricing) {
  const [isYearly, setIsYearly] = useState(false)

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
        <span className={`ml-3 text-sm pr-3 font-medium  ${!isYearly ? " text-gray-900" : " text-gray-400"}`}>
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
        <span className={`ml-3 text-sm pr-3 font-medium ${isYearly ? " text-gray-900" : " text-gray-400"}`}>
          Yearly
        </span>
      </div>
      <div className="mx-auto max-w-3xl rounded-3xl ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-[840px]">
        <div className="p-8 sm:p-10 lg:flex-auto sm:max-w-[550px]">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">All-Access Subscription</h3>
          <p className="mt-6 text-base leading-5 text-gray-600">
            Unlock the full power of Alpha with our All-Access Subscription. Stay ahead of the AI curve with unlimited
            access to curated content, personalized recommendations, and exclusive features.
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
              <div className="flex w-full justify-center">
                <p className="text-base font-semibold text-gray-600">{!isYearly ? "Monthly fee" : "Yearly fee"}</p>
                {isYearly && (
                  <span className="flex  items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20 ml-2">
                    -{calculateDiscount(monthlyPrice, yearlyPrice)}%
                  </span>
                )}
              </div>

              <p className="mt-6 flex items-baseline justify-center gap-x-2">
                <span className="text-5xl font-bold tracking-tight text-gray-900">
                  ${!isYearly ? monthlyPrice : yearlyPrice}
                </span>
                <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
              </p>
              <button className="mt-10  w-full rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
                Get access
              </button>
              <p className="mt-5 mb-1 text-[14px] leading-5 text-gray-600 font-bold">7 day free trial</p>

              <p className=" text-xs leading-5 text-gray-600">Cancle anytime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
