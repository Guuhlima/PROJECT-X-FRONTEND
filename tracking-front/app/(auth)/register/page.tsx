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
            Create Your Account
          </span>

          <div className="flex flex-col gap-2">
            <label className="text-black">Username</label>
            <Input type="text" placeholder="Username" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black">Email</label>
            <Input type="email" placeholder="Email" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-black">Password</label>
            <Input type="password" placeholder="Password" />
          </div>

          <Button type="submit">Submit</Button>

            <div className="w-full flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-300" aria-hidden="true"></div>
                    <span className="text-sm text-gray-500">Log in with</span>
                <div className="h-px flex-1 bg-gray-300" aria-hidden="true"></div>
            </div>

            <div>
                <span className="flex flex-col items-center text-black">Google</span>
            </div>

            <div className="flex flex-col items-center">
                <span className="text-black">
                    You have Account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Sing In
                    </Link>
                </span>
            </div>
        </div>
      </div>

    </div>
  )
}
