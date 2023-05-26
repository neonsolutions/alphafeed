import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { UserCircleIcon, HomeIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"

export default function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { asPath } = router

  const loading = status === "loading"

  let linkElement

  if (asPath === "/") {
    linkElement = (
      <Link href="/login">
        <div className="text-sm font-semibold leading-6 text-gray-900">
          Log in <span aria-hidden="true">&rarr;</span>
        </div>
      </Link>
    )
  } else if (asPath === "/feed") {
    linkElement = (
      <Link href="/account">
        <UserCircleIcon className="h-6 w-6 text-gray-900" />
      </Link>
    )
  } else if (asPath === "/account") {
    // we are on the account page
    linkElement = (
      <Link href="/home">
        <HomeIcon className="h-6 w-6 text-gray-900" />
      </Link>
    )
  } else if (asPath === "/login" || asPath === "/register") {
    // we are on the account page
    linkElement = (
      <div className="text-sm font-semibold leading-6 text-gray-900">
        <Link href="/">
          <span aria-hidden="true">←</span> Back
        </Link>
      </div>
    )
  }

  return (
    <header className="inset-x-0 top-0 ">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/">
            <Image src="/images/logoWithText.svg" alt="logoWithText" className="-m-1.5 p-1.5" height={30} width={100} />
          </Link>
        </div>
        <div className=" lg:flex lg:flex-1 lg:justify-end">{linkElement}</div>
      </nav>
    </header>
  )
}
