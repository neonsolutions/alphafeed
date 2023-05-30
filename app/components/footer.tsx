import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <div className="w-full px-6 lg:px-8 py-6  border-t-2 border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-black/95 text-center transition-colors duration-500">
      <div className="block justify-center sm:gap-3 gap-1 pt-2 sm:flex">
        <div className="flex gap-1 justify-center sm:pb-0 pb-1">
          <a href="" target="_blank">
            <EnvelopeIcon className="w-[22px] flex-none text-gray-400 mr-2" aria-hidden="true" />
          </a>
          <a href="" target="_blank">
            <Image src="/images/twitterIcon.svg" alt="Twitter" width={23} height={23} />
          </a>
        </div>
        <p className="text-sm text-gray-400 hover:text-indigo-300 sm:block hidden">|</p>

        <Link href="/privacy-policy">
          <p className="text-sm text-gray-400 hover:text-indigo-300 hover:underline  pb-1 sm:pb-0">Privacy Policy</p>
        </Link>
        <p className="text-sm text-gray-400 hover:text-indigo-300 sm:block hidden">|</p>
        <Link href="/terms-and-conditions ">
          <p className="text-sm text-gray-400 hover:text-indigo-300 hover:underline pb-2 ">Terms And Conditions</p>
        </Link>
      </div>
      <p className="text-sm text-gray-400/70 pt-2">Alpha Feed © 2023</p>
    </div>
  )
}
