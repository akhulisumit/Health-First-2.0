"use client"

import { useState } from "react"
import { Plus, Stethoscope } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface PrescriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  patient: {
    name: string
    age: string
    bloodGroup: string
    contact: string
  }
}

interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
}

export function PrescriptionDialog({
  open,
  onOpenChange,
  patient,
}: PrescriptionDialogProps) {
  const [diagnosis, setDiagnosis] = useState("")
  const [medications, setMedications] = useState<Medication[]>([])
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [doctorSignature, setDoctorSignature] = useState("")
  const currentDate = new Date().toLocaleDateString()
  const registrationNumber = "DR12345"

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      { name: "", dosage: "", frequency: "", duration: "" },
    ])
  }

  const updateMedication = (index: number, field: keyof Medication, value: string) => {
    const updatedMedications = medications.map((medication, i) => {
      if (i === index) {
        return { ...medication, [field]: value }
      }
      return medication
    })
    setMedications(updatedMedications)
  }

  const handleGeneratePrescription = () => {
    // Handle prescription generation
    console.log({
      patient,
      diagnosis,
      medications,
      additionalNotes,
      doctorSignature,
      date: currentDate,
      registrationNumber,
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Stethoscope className="h-6 w-6 text-blue-600" />
            New Prescription
          </DialogTitle>
        </DialogHeader>

        {/* Patient Information */}
        <div className="bg-blue-50 p-4 rounded-lg space-y-4">
          <h2 className="font-semibold text-lg">Patient Information</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Name: {patient.name}</Label>
              <Label className="block">Age: {patient.age}</Label>
            </div>
            <div>
              <Label>Blood Group: {patient.bloodGroup}</Label>
              <Label className="block">Contact: {patient.contact}</Label>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnosis</Label>
          <Textarea
            id="diagnosis"
            value={diagnosis}
            onChange={(e) => setDiagnosis(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Medications */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Medications</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddMedication}
              className="text-blue-600"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Medication
            </Button>
          </div>
          {medications.map((medication, index) => (
            <div key={index} className="grid grid-cols-4 gap-2">
              <Input
                placeholder="Medicine name"
                value={medication.name}
                onChange={(e) => updateMedication(index, "name", e.target.value)}
              />
              <Input
                placeholder="Dosage"
                value={medication.dosage}
                onChange={(e) => updateMedication(index, "dosage", e.target.value)}
              />
              <Input
                placeholder="Frequency"
                value={medication.frequency}
                onChange={(e) => updateMedication(index, "frequency", e.target.value)}
              />
              <Input
                placeholder="Duration"
                value={medication.duration}
                onChange={(e) => updateMedication(index, "duration", e.target.value)}
              />
            </div>
          ))}
        </div>

        {/* Additional Notes */}
        <div className="space-y-2">
          <Label htmlFor="additional-notes">Additional Notes</Label>
          <Textarea
            id="additional-notes"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Doctor's Signature */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signature">Doctor's Signature</Label>
            <Input
              id="signature"
              placeholder="Type your full name to sign"
              value={doctorSignature}
              onChange={(e) => setDoctorSignature(e.target.value)}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Date: {currentDate}</span>
            <span>Registration No: {registrationNumber}</span>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleGeneratePrescription}>
            Generate Prescription
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

