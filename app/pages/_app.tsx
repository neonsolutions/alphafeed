import Layout from "../components/layout"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <SessionProvider session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </div>
  )
}

export default MyApp
