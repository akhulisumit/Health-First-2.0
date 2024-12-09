"use client"

import { useState } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Calendar, FileText, HelpCircle, Home, LogOut, Menu, Search, Settings, User, X } from 'lucide-react'

export default function DoctorDashboardLayout({
children,
}: {
children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Image
              src="/placeholder.svg"
              alt="Health First Logo"
              width={32}
              height={32}
              className="ml-2 md:ml-0"
            />
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" alt="Dr. Smith" />
              <AvatarFallback>DS</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium hidden md:inline">Dr. John Smith</span>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          bg-white w-64 flex-shrink-0 border-r border-gray-200
          fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out z-30
          md:relative md:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full">
            <div className="p-4">
              <h1 className="font-bold text-lg">Health First</h1>
              <p className="text-sm text-gray-500">For better healthcare</p>
            </div>
            <nav className="flex-1 overflow-y-auto py-4">
              <Link href="/dashboard/doctor" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Home className="h-5 w-5" />
                Dashboard
              </Link>
              <Link href="/dashboard/doctor/appointments" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Calendar className="h-5 w-5" />
                Appointments
              </Link>
              <Link href="/dashboard/doctor/patient-records" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                <FileText className="h-5 w-5" />
                Patient Records
              </Link>
              <Link href="/dashboard/doctor/notifications" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                Notifications
              </Link>
              <Link href="/dashboard/doctor/settings" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </nav>
            <div className="p-4 border-t border-gray-200">
              <Link href="/dashboard/doctor/profile" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="h-5 w-5" />
                Profile
              </Link>
              <Link href="/" className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-100">
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

