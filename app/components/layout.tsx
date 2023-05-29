import Footer from "./footer"
import Navbar from "./navbar"
import { useEffect, useState } from "react"
import { DM_Sans } from "next/font/google"

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState<boolean>(false)

  useEffect(() => {
    if (localStorage.getItem("darkMode") === "true") {
      setDarkMode(true)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "true")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "false")
    }
  }, [darkMode])

  const mainClass = " flex flex-col min-h-screen overflow-hidden"

  return (
    <div className={darkMode ? "dark " + mainClass : mainClass}>
      <Navbar darkMode={darkMode} setDarkMode={(mode: boolean) => setDarkMode(mode)} />

      <main className={dmSans.className + " flex-grow "}>{children}</main>
      <Footer />
    </div>
  )
}
