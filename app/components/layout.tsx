import Footer from "./footer"
import Navbar from "./navbar"

import { DM_Sans } from "next/font/google"

const dmSans = DM_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className={dmSans.className}>{children}</main>
      <Footer />
    </>
  )
}
