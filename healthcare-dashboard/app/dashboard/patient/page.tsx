"use client"

import { useState, useEffect } from 'react'
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ChevronDown, Clock } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PatientDashboard() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [feelingInput, setFeelingInput] = useState('')
  const [shareLoading, setShareLoading] = useState(false)
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(new Date())
  const [appointmentTime, setAppointmentTime] = useState<string | undefined>(undefined)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [medicineReminder, setMedicineReminder] = useState(true)
  const [dailyCheckInReminder, setDailyCheckInReminder] = useState(true)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setSearchLoading(true)
    setTimeout(() => {
      setSearchLoading(false)
      // Implement actual search logic here
    }, 300)
  }

  const handleShareFeeling = () => {
    setShareLoading(true)
    setTimeout(() => {
      setShareLoading(false)
      console.log("Feeling shared:", feelingInput)
      setFeelingInput('')
    }, 1000)
  }

  const handleBookAppointment = () => {
    setBookingLoading(true)
    setTimeout(() => {
      setBookingLoading(false)
      console.log("Appointment booked for:", appointmentDate, appointmentTime)
    }, 1000)
  }

  const toggleMedicineReminder = () => {
    setMedicineReminder(!medicineReminder)
    console.log("Medicine reminder toggled:", !medicineReminder)
  }

  const toggleDailyCheckInReminder = () => {
    setDailyCheckInReminder(!dailyCheckInReminder)
    console.log("Daily check-in reminder toggled:", !dailyCheckInReminder)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Next Medicine Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Next Medicine</CardTitle>
              <Button variant="ghost" size="sm">
                See Details <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Medicine Name:</p>
                  <p>Paracetamol</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Doses</p>
                  <p>1/7</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time:</p>
                  <p>08:00 P.M</p>
                  <p className="text-sm text-gray-500">(After dinner)</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Reminder</p>
                  <Switch 
                    checked={medicineReminder} 
                    onCheckedChange={toggleMedicineReminder}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Book Appointment Section */}
          <Card>
            <CardHeader>
              <CardTitle>Book an Appointment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select a Date</label>
                  <Input
                    type="date"
                    value={appointmentDate?.toISOString().split('T')[0]}
                    onChange={(e) => setAppointmentDate(new Date(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select a Time</label>
                  <Select onValueChange={setAppointmentTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:00">03:00 PM</SelectItem>
                      <SelectItem value="16:00">04:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={handleBookAppointment}
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Book Appointment"}
              </Button>
            </CardContent>
          </Card>

          {/* Daily Health Management */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Health Management</CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={70} className="h-4" />
              <div className="flex justify-between items-center mt-2">
                <p>7 Check-in of 10</p>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Reminder</span>
                  <Switch 
                    checked={dailyCheckInReminder} 
                    onCheckedChange={toggleDailyCheckInReminder}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily Report Streak Section */}
        <div className="lg:col-span-1">
          <Card className="bg-yellow-100">
            <CardHeader>
              <CardTitle className="text-center">DAILY REPORT STREAK</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Samira Hadid", score: 125 },
                  { name: "Frances Mercer", score: 120 },
                  { name: "Estelle Darcy", score: 115 },
                  { name: "Francisco Andrade", score: 100 },
                  { name: "Juliana Silva", score: 96 },
                ].map((user, index) => (
                  <div key={index} className="flex items-center justify-between bg-white/50 p-2 rounded-lg">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{index + 1}.</span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder.svg`} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-600">
                      <span>🌟</span>
                      <span>{user.score}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">How are you feeling today?</h3>
                <Textarea
                  className="w-full h-24 p-3 rounded-lg border resize-none bg-white"
                  placeholder="Share your thoughts..."
                  value={feelingInput}
                  onChange={(e) => setFeelingInput(e.target.value)}
                />
                <Button 
                  className="w-full mt-2"
                  onClick={handleShareFeeling}
                  disabled={shareLoading}
                >
                  {shareLoading ? "Sharing..." : "Share"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

