import Footer from "./footer"
import Navbar from "./navbar"

import { DM_Sans } from "next/font/google"

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Navbar />
      <main className={dmSans.className + " flex-grow "}>{children}</main>
      <Footer />
    </div>
  )
}
