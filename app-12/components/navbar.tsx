import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <header className="inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image src="/images/logoWithText.svg" alt="logoWithText" height={30} width={100} />
          </Link>
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
  )
}
