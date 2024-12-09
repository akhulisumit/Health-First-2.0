"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function BookAppointment() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [bookingLoading, setBookingLoading] = useState(false)

  const handleBookAppointment = () => {
    setBookingLoading(true)
    setTimeout(() => {
      setBookingLoading(false)
      console.log("Appointment booked")
    }, 1000)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Book an Appointment</h1>
      <Card>
        <CardHeader>
          <CardTitle>Select Appointment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Select a Date</label>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Select a Time</label>
            <Select>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason for Visit</label>
            <Textarea placeholder="Please describe your reason for the appointment" />
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
    </>
  )
}

