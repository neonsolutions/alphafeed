import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <div className="w-full px-6 lg:px-8 py-6  border-t-2 border-gray-200 bg-gray-100 text-center ">
      <div className="flex justify-center gap-3 pt-2">
        <Link href="/privacy-policy">
          <p className="text-sm text-gray-400 hover:text-indigo-300 hover:underline">Privacy Policy</p>
        </Link>
        <p className="text-sm text-gray-400 hover:text-indigo-300 ">|</p>
        <Link href="/terms-and-conditions ">
          <p className="text-sm text-gray-400 hover:text-indigo-300 hover:underline">Terms And Conditions</p>
        </Link>
        <p className="text-sm text-gray-400 hover:text-indigo-300">|</p>
        <div className="flex gap-1">
          <a href="" target="_blank">
            <EnvelopeIcon className="w-[22px] flex-none text-gray-400 mr-2" aria-hidden="true" />
          </a>
          <a href="" target="_blank">
            <Image src="/images/twitterIcon.svg" alt="Twitter" width={23} height={23} />
          </a>
        </div>
      </div>
      <p className="text-sm text-gray-400 pt-3">Product of Onset Carbon © 2022</p>
    </div>
  )
}
