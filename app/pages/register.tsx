import Image from "next/image"
import Link from "next/link"
import { GoogleLoginButton } from "react-social-login-buttons"

export default function Register() {
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image src="/images/logo.svg" alt="logoNoText" className="mx-auto h-10 w-auto" height={30} width={30} />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register an account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <GoogleLoginButton style={{ fontSize: "15px" }} onClick={() => {}}>
          <span>Register with Google</span>
        </GoogleLoginButton>
        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{" "}
          <Link href="/login">
            <span className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">Log in</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
