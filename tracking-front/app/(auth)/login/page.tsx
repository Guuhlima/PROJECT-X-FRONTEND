import Button from "@/app/shared/components/Button"
import Input from "@/app/shared/components/Input"
import Link from "next/link"

export default function Page() {
    return (
        <div >
            <div className="flex flex-col gap-2 items-center">
                Login Page
            </div>

            <div className="flex justify-end mt-20">
                <div className="flex flex-col w-150 h-150 mt-20 mr-44 gap-4">
                    <span className="ml-52">
                        Tracking Your's Products
                    </span>
                    
                    <div>
                        <Input className="mb-2" placeholder="Username" />
                        <Input type="password" placeholder="Password"/>
                    </div>

                    <div>
                        <div className="">
                            <Button className="w-full" type="submit">
                                Sing In
                            </Button>
                        </div>
                    </div>

                    <div className="">
                        <span>
                            Don't have an account?{" "}
                            <Link href="/register" className="text-blue-500 hover:underline">
                                Sing Up
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}