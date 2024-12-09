"use client"

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { PrescriptionDialog } from "./prescription-dialog"

interface Appointment {
  id: number
  patient: {
    name: string
    age: string
    bloodGroup: string
    contact: string
  }
  date: string
  time: string
  type: string
  prescription: string
}

export default function DoctorAppointments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState<Appointment["patient"] | null>(null)
  const [prescriptionDialogOpen, setPrescriptionDialogOpen] = useState(false)
  
  const [appointments] = useState<Appointment[]>([
    {
      id: 1,
      patient: {
        name: "Alice Johnson",
        age: "28",
        bloodGroup: "A+",
        contact: "+1 (555) 123-4567"
      },
      date: "2024-12-01",
      time: "09:00 AM",
      type: "Check-up",
      prescription: ""
    },
    {
      id: 2,
      patient: {
        name: "Bob Smith",
        age: "45",
        bloodGroup: "O+",
        contact: "+1 (555) 234-5678"
      },
      date: "2024-12-01",
      time: "10:30 AM",
      type: "Follow-up",
      prescription: ""
    },
    {
      id: 3,
      patient: {
        name: "Carol Williams",
        age: "35",
        bloodGroup: "B-",
        contact: "+1 (555) 345-6789"
      },
      date: "2024-12-01",
      time: "02:00 PM",
      type: "Consultation",
      prescription: ""
    },
    {
      id: 4,
      patient: {
        name: "David Brown",
        age: "52",
        bloodGroup: "AB+",
        contact: "+1 (555) 456-7890"
      },
      date: "2024-12-02",
      time: "11:00 AM",
      type: "New Patient",
      prescription: ""
    },
    {
      id: 5,
      patient: {
        name: "Eva Davis",
        age: "31",
        bloodGroup: "A-",
        contact: "+1 (555) 567-8901"
      },
      date: "2024-12-02",
      time: "03:30 PM",
      type: "Check-up",
      prescription: ""
    },
  ])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setSearchLoading(true)
    setTimeout(() => {
      setSearchLoading(false)
    }, 300)
  }

  const handleAddPrescription = (patient: Appointment["patient"]) => {
    setSelectedPatient(patient)
    setPrescriptionDialogOpen(true)
  }

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Appointments</h1>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${searchLoading ? 'animate-spin' : ''}`} />
        <Input
          placeholder="Search appointments..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.patient.name}</TableCell>
                  <TableCell>{appointment.date}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>{appointment.type}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleAddPrescription(appointment.patient)}
                      size="sm"
                      variant="outline"
                    >
                      Add Prescription
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedPatient && (
        <PrescriptionDialog
          open={prescriptionDialogOpen}
          onOpenChange={setPrescriptionDialogOpen}
          patient={selectedPatient}
        />
      )}
    </div>
  )
}

