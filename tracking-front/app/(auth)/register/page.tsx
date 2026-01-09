import Button from "@/app/shared/components/Button"
import Input from "@/app/shared/components/Input"
import Link from "next/link"

export default function Page() {
    return (
        <div className="flex justify-end mt-20">

            <div className="flex flex-col w-105 mt-20 mr-44 gap-4">
                <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold">Create Your Account</span>
                </div>

                <div className="flex flex-col gap-2">
                    <Input className="w-full" type="text" placeholder="Username" />
                    <Input className="w-full" type="email" placeholder="Email" />
                    <Input className="w-full" type="password" placeholder="Password" />
                </div>

                <Button type="submit">Submit</Button>

                <div>
                    <span>
                        You have Account?{" "}
                        <Link href="/login" className="text-blue-500 hover:underline">
                            Sing In
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}