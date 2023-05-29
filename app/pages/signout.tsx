import { useEffect } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Head from "next/head"

export default function SignOut() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading" && !session) {
      router.push("/")
    }
  }, [session, status])

  useEffect(() => {
    signOut({ callbackUrl: "/" })
  }, [])

  return (
    <>
      <Head>
        <title>Signing out...</title>
      </Head>
      <div>Signing you out. You will be redirected...</div>
    </>
  )
}
