"use client"

import React, { useState, useCallback } from 'react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function PatientRecords() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  const patients = [
    { id: 1, name: "Alice Johnson", dob: "1985-03-15", lastVisit: "2024-11-20", condition: "Hypertension" },
    { id: 2, name: "Bob Smith", dob: "1990-07-22", lastVisit: "2024-11-18", condition: "Diabetes" },
    { id: 3, name: "Carol Williams", dob: "1978-11-30", lastVisit: "2024-11-15", condition: "Asthma" },
    { id: 4, name: "David Brown", dob: "1982-05-10", lastVisit: "2024-11-10", condition: "Arthritis" },
    { id: 5, name: "Eva Davis", dob: "1995-09-03", lastVisit: "2024-11-05", condition: "Migraine" },
  ]

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setLoading(true)
    // Simulate search delay
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }, [])

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Patient Records</h1>
      <div className="relative">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${loading ? 'animate-spin' : ''}`} />
        <Input
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Patient List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date of Birth</TableHead>
                <TableHead>Last Visit</TableHead>
                <TableHead>Condition</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.dob}</TableCell>
                  <TableCell>{patient.lastVisit}</TableCell>
                  <TableCell>{patient.condition}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

