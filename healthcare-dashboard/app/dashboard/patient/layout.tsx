import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Calendar, ChevronDown, FileText, HelpCircle, Home, LogOut, Search, Settings, User, Stethoscope } from 'lucide-react'

export default function PatientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1b1e] text-white p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-8">
          <Image
            src="/placeholder.svg"
            alt="Health First Logo"
            width={32}
            height={32}
            className="text-red-500"
          />
          <div>
            <h1 className="font-bold">Health First</h1>
            <p className="text-sm text-gray-400">For your better health</p>
          </div>
        </div>
        <nav className="space-y-2 flex-grow">
          <Link href="/dashboard/patient" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link href="/dashboard/patient/symptoms-analyzer" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <Stethoscope className="h-5 w-5" />
            Symptoms Analyzer
          </Link>
          <Link href="/dashboard/patient/medical-reports" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <FileText className="h-5 w-5" />
            Medical Reports
          </Link>
          <Link href="/dashboard/patient/notifications" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <Bell className="h-5 w-5" />
            Notifications
          </Link>
          <Link href="/dashboard/patient/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <Settings className="h-5 w-5" />
            Settings
          </Link>
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <LogOut className="h-5 w-5" />
            Logout
          </Link>
        </nav>
        <div className="pt-4 mt-4 border-t border-white/10">
          <Link href="/dashboard/patient/account" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <User className="h-5 w-5" />
            Account
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10">
            <HelpCircle className="h-5 w-5" />
            Help
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b p-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg" alt="User" />
                <AvatarFallback>CC</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">Cody Cavier</h2>
                <p className="text-sm text-gray-500">Your Streak: 15</p>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search here..."
                  className="pl-10 w-full md:w-[300px] bg-gray-50"
                />
              </div>
              <Button variant="destructive">Recent Report</Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

