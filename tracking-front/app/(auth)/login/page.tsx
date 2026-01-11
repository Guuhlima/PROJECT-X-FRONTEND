import Button from "@/app/shared/components/Button"
import Input from "@/app/shared/components/Input"
import Link from "next/link"
import FutureTrail from "../../shared/components/FutureTrail"

export default function Page() {
  return (
    <div className="flex min-h-screen">

      <div className="w-3/4 h-screen bg-gray-200 overflow-hidden">
         <FutureTrail />
      </div>
      
      <div className="w-px bg-gray-300"></div>

      <div className="w-1/4 flex justify-center items-center">
        <div className="flex flex-col w-full max-w-sm gap-4">

          <span className="text-lg font-semibold text-center text-black">
            Tracking Your's Products
          </span>

          <div className="flex flex-col gap-2">
            <label className="text-black">Email</label>
            <Input type="email" placeholder="Email" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black">Password</label>
            <Input type="password" placeholder="Password" />
          </div>

          <Button className="w-full" type="submit">
            <Link href="/home">
              Login
            </Link>
          </Button>

          <div className="w-full flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="text-sm text-gray-500">Log in with</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <div className="flex justify-center text-black">
            <img width="48" height="48" src="https://img.icons8.com/fluency/48/google-logo.png" alt="google-logo"/>
          </div>

          <div className="flex justify-center text-black">
            <span>
              Don't have an account?{" "}
              <Link href="/register" className="text-blue-500 hover:underline">
                Sign Up
              </Link>
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}