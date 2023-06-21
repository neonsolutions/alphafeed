import Layout from "../components/layout"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import Head from "next/head"
import { ThemeProvider } from "next-themes"
import Script from "next/script"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" themes={["light", "dark", "system"]}>
      <Head>
        <title>Alpha Feed</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"></link>
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>

        <meta property="og:title" content="Alpha Feed" />
        <meta
          property="og:description"
          content="Cut out the noise and surface the most significant Machine Learning content of the day."
        />
        <meta property="og:image" content="https://alphafeed.xyz/images/twitter-card.png" />
        <meta property="og:url" content="https://alphafeed.xyz/" />

        <meta name="twitter:title" content="Alpha Feed" />
        <meta
          name="twitter:description"
          content="Cut out the noise and surface the most significant Machine Learning content of the day."
        />
        <meta name="twitter:image" content="https://alphafeed.xyz/images/twitter-card.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <div className="flex flex-col min-h-screen h-full ">
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Script
              strategy="lazyOnload"
              src={`https://beampipe.io/js/tracker.js`}
              data-beampipe-domain="alphafeed.xyz"
            />
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
