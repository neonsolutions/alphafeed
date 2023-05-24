import type { NextPage } from "next"
import Head from "next/head"
import LandingPage from "../components/landingPage"
import Layout from "../components/layout"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  )
}

export default Home
