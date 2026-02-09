"use client"

import Button from "@/app/shared/components/Button/Button"
import Input from "@/app/shared/components/Input"
import Link from "next/link"
import FutureTrail from "../../shared/components/FutureTrail"
import GoogleButton from "@/app/shared/components/Button/GoogleButton"
import { useRouter } from "next/navigation"

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen">

      <div className="w-3/4 h-screen bg-muted overflow-hidden">
         <FutureTrail />
      </div>
      
      <div className="w-px bg-border"></div>

      <div className="w-1/4 flex justify-center items-center">
        <div className="flex flex-col w-full max-w-sm gap-4">

          <span className="text-lg font-semibold text-center text-foreground">
            Tracking Your's Products
          </span>

          <div className="flex flex-col gap-2">
            <label className="text-foreground">Email</label>
            <Input type="email" placeholder="Email" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-foreground">Password</label>
            <Input type="password" placeholder="Password" />
          </div>

          <Button className="w-full" type="button">
            <Link href="/home">
              Login
            </Link>
          </Button>

          <div className="w-full flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">Log in with</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex justify-center text-foreground">
            <GoogleButton 
              clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
              onCredential={(token) => {
                console.log("ID Token", token)
                router.push("/home");
              }}
            />
          </div>

          <div className="flex justify-center text-foreground">
            <span>
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign Up
              </Link>
            </span>
          </div>

        </div>
      </div>

    </div>
  )
}
