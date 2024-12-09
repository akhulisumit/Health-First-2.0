import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { UserRound, UserCog } from 'lucide-react'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/placeholder.svg"
              alt="Health First Logo"
              width={40}
              height={40}
              className="text-blue-600"
            />
            <h1 className="text-2xl font-bold text-blue-900 ml-2">Health First</h1>
          </div>
          <p className="text-gray-600">For your better health</p>
        </div>
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
            <CardDescription className="text-center">
              Choose your role to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link href="/dashboard/patient" passHref>
              <Button className="w-full h-20 text-lg bg-blue-600 hover:bg-blue-700" size="lg">
                <UserRound className="mr-2 h-6 w-6" />
                Login as Patient
              </Button>
            </Link>
            <Link href="/dashboard/doctor" passHref>
              <Button className="w-full h-20 text-lg" variant="outline" size="lg">
                <UserCog className="mr-2 h-6 w-6" />
                Login as Healthcare Provider
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

