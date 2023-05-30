import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { UserCircleIcon, HomeIcon } from "@heroicons/react/24/outline"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { signOut } from "next-auth/react"

const postData = async ({ url }: { url: string }) => {
  const res: Response = await fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    credentials: "same-origin",
  })

  if (!res.ok) {
    console.log("Error in postData", { url, res })

    throw Error(res.statusText)
  }

  return res.json()
}

export default function Navbar({ theme, setTheme }: { theme: any; setTheme: any }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { asPath } = router
  const [dropdownVisible, setDropdownVisible] = useState(false) // New state
  const [buttonText, setButtonText] = useState("Switch to dark mode")
  const loading = status === "loading"

  useEffect(() => {
    setButtonText(`Switch to ${theme === "dark" ? "light" : "dark"} mode`)
  }, [theme])

  const switchTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
    localStorage.setItem("theme", theme === "dark" ? "light" : "dark")
  }

  const redirectToCustomerPortal = async () => {
    // setLoading(true);
    try {
      const { url, error } = await postData({
        url: "/api/payment/create-portal-link",
      })
      window.location.assign(url)
    } catch (error) {
      if (error) return alert((error as Error).message)
    }
    // setLoading(false);
  }

  return (
    <header className="inset-x-0 top-0 ">
      <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 z-40">
          <Link href="/">
            <Image src="/images/logoWithText.svg" alt="logoWithText" className="-m-1.5 p-1.5" height={30} width={100} />
          </Link>
        </div>
        <button className="text-black z-40" onClick={switchTheme}>
          {buttonText}
        </button>
        <div className=" lg:flex lg:flex-1 lg:justify-end z-40">
          {session?.user ? (
            <>
              <div
                className=""
                onMouseEnter={() => setDropdownVisible(true)} // Show dropdown on hover
                onMouseLeave={() => setDropdownVisible(false)} // Hide dropdown on hover exit
              >
                <UserCircleIcon className="h-6 w-10 text-gray-900" />
                {dropdownVisible && ( // Show dropdown if dropdownVisible is true
                  <div className=" absolute right-8 translate w-32 rounded-md shadow-xl bg-white ring-1 ring-black ring-opacity-5 transition-all ease-out duration-300 transform opacity-100 scale-100 text-gray-900 text-[12px] font-medium">
                    <Link
                      onClick={() => {
                        redirectToCustomerPortal()
                      }}
                      href="#"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div
                        role="menuitem"
                        className="flex justify-center items-center py-2 hover:bg-gray-100 rounded-t-md"
                      >
                        Manage billing
                      </div>
                    </Link>

                    <Link
                      onClick={() => signOut({ callbackUrl: "/" })}
                      href="#"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <div
                        role="menuitem"
                        className="flex justify-center items-center py-2 hover:bg-gray-100 rounded-b-md"
                      >
                        Sign out
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </>
          ) : router.asPath !== "/login" ? (
            <div>
              <Link href="/login">
                <div className="text-sm font-semibold leading-6 text-gray-900">
                  Log in <span aria-hidden="true">&rarr;</span>
                </div>
              </Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </header>
  )
}
