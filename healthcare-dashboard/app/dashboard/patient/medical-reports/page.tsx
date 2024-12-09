"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download } from 'lucide-react'
import { useState } from 'react';

export default function MedicalReports() {
  const reports = [
    { id: 1, name: "Annual Check-up Report", date: "2024-10-15", doctor: "Dr. Smith" },
    { id: 2, name: "Blood Test Results", date: "2024-09-22", doctor: "Dr. Johnson" },
    { id: 3, name: "X-Ray Report", date: "2024-08-30", doctor: "Dr. Williams" },
    { id: 4, name: "Vaccination Record", date: "2024-07-12", doctor: "Dr. Brown" },
  ]

  const [actionLoading, setActionLoading] = useState<{ [key: string]: boolean }>({})

  const handleAction = (id: number, action: 'view' | 'download') => {
    setActionLoading(prev => ({ ...prev, [`${id}-${action}`]: true }))
    setTimeout(() => {
      setActionLoading(prev => ({ ...prev, [`${id}-${action}`]: false }))
      console.log(`${action} report ${id}`)
    }, 1000)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Medical Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Medical Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.name}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.doctor}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(report.id, 'view')}
                      disabled={actionLoading[`${report.id}-view`]}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {actionLoading[`${report.id}-view`] ? "Loading..." : "View"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAction(report.id, 'download')}
                      disabled={actionLoading[`${report.id}-download`]}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {actionLoading[`${report.id}-download`] ? "Loading..." : "Download"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}

