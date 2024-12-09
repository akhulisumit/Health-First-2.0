"use client"

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ChevronDown, Search } from 'lucide-react'

export default function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [viewAllLoading, setViewAllLoading] = useState(false)

  const appointments = [
    { id: 1, patient: "Alice Johnson", date: "2024-11-28", time: "09:00 AM", type: "Check-up" },
    { id: 2, patient: "Bob Smith", date: "2024-11-28", time: "10:30 AM", type: "Follow-up" },
    { id: 3, patient: "Carol Williams", date: "2024-11-28", time: "02:00 PM", type: "Consultation" },
  ]

  const [filteredAppointments, setFilteredAppointments] = useState(appointments)

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    setSearchLoading(true)

    const filtered = appointments.filter(appointment =>
      appointment.patient.toLowerCase().includes(term.toLowerCase()) ||
      appointment.type.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredAppointments(filtered)
    setSearchLoading(false)
  }, [appointments])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = appointments.filter(appointment =>
        appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredAppointments(filtered)
      setSearchLoading(false)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, appointments])

  const handleViewAll = () => {
    setViewAllLoading(true)
    setTimeout(() => {
      setViewAllLoading(false)
      console.log("View all clicked")
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between py-2">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleViewAll}
              disabled={viewAllLoading}
            >
              {viewAllLoading ? "Loading..." : (
                <>
                  View All <ChevronDown className="ml-1 h-4 w-4" />
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="relative mb-2">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 ${searchLoading ? 'animate-spin' : ''}`} />
              <Input
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-9 h-8 text-sm"
              />
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Patient</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Time</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="py-2 text-sm">{appointment.patient}</TableCell>
                      <TableCell className="py-2 text-sm">{appointment.date}</TableCell>
                      <TableCell className="py-2 text-sm">{appointment.time}</TableCell>
                      <TableCell className="py-2 text-sm">{appointment.type}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: "Total Patients", value: "1,234" },
                  { name: "Appointments Today", value: "12" },
                  { name: "Pending Reports", value: "8" },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{stat.name}</span>
                    <span className="font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Review lab results",
                  "Prepare for conference",
                  "Follow up with Patient #876",
                  "Complete education module",
                ].map((task, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded text-blue-500 focus:ring-blue-500" />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

