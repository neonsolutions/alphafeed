import Image from "next/image"
import { GoogleLoginButton } from "react-social-login-buttons"
import Link from "next/link"
import { signIn } from "next-auth/react"

export default function Login() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/images/logo.svg" alt="logoNoText" className="mx-auto h-10 w-auto" height={30} width={30} />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <GoogleLoginButton
          style={{ fontSize: "15px" }}
          onClick={() =>
            signIn("google", {
              callbackUrl: "/feed",
            })
          }
        />
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{" "}
          <Link href="/register">
            <span className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
              Start a 7 day free trial
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}
