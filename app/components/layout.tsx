import Footer from "./footer"
import Navbar from "./navbar"
import { useEffect, useState, useLayoutEffect } from "react"
import { DM_Sans } from "next/font/google"
import { useTheme } from "next-themes"
import { Metadata } from "next"

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Alpha Feed",
  description: `Cut out the noise and surface the most significant Machine Learning content of the day.`,
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true"
    }
    return false
  })

  useEffect(() => {
    setTheme(theme || "system")
  }, [])

  const mainClass = " flex flex-col min-h-screen overflow-hidden bg-white dark:bg-black  transition-colors duration-500"

  return (
    <div className={darkMode ? "dark transition-colors duration-500" + mainClass : mainClass}>
      <Navbar theme={resolvedTheme} setTheme={setTheme} />
      <main className={dmSans.className + " flex-grow  "}>{children}</main>
      <Footer />
    </div>
  )
}
