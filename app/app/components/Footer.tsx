import { EnvelopeIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import twitterIcon from "../../public/images/twitterIcon.svg"

export default function Footer() {
  return (
    <div className="w-full px-6 lg:px-8 py-6  border-t-2 border-gray-200 bg-gray-100 text-center ">
      <p className="text-sm text-gray-400">Product of Onset Carbon © 2022</p>
      <div className="flex justify-center w-full pt-2">
        <a href="" target="_blank">
          <EnvelopeIcon className="w-6 flex-none text-gray-400 mr-2" aria-hidden="true" />
        </a>
        <a href="" target="_blank">
          <Image src={twitterIcon} alt="Twitter" width={23} height={23} />
        </a>
      </div>
    </div>
  )
}
