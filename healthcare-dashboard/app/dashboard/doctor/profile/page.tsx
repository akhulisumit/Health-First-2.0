"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Profile() {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  const handleAction = (action: string) => {
    setLoading(prev => ({ ...prev, [action]: true }))
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [action]: false }))
      console.log(`${action} completed`)
    }, 1000)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Doctor Profile</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt="Dr. Smith" />
                <AvatarFallback>DS</AvatarFallback>
              </Avatar>
              <Button
                onClick={() => handleAction('changePicture')}
                disabled={loading['changePicture']}
              >
                {loading['changePicture'] ? "Changing..." : "Change Picture"}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <Input defaultValue="Dr. John Smith" className="mt-1" />
              </div>
              <div>
                <Label>Specialization</Label>
                <Input defaultValue="General Practitioner" className="mt-1" />
              </div>
              <div>
                <Label>Email</Label>
                <Input defaultValue="dr.smith@example.com" className="mt-1" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input defaultValue="+1 (555) 123-4567" className="mt-1" />
              </div>
            </div>
            <Button
              onClick={() => handleAction('editProfile')}
              disabled={loading['editProfile']}
            >
              {loading['editProfile'] ? "Saving..." : "Save Changes"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>License Number</Label>
                <Input defaultValue="MD12345678" className="mt-1" />
              </div>
              <div>
                <Label>Years of Experience</Label>
                <Input defaultValue="15" className="mt-1" />
              </div>
              <div>
                <Label>Hospital Affiliation</Label>
                <Input defaultValue="City General Hospital" className="mt-1" />
              </div>
              <div>
                <Label>Languages</Label>
                <Input defaultValue="English, Spanish" className="mt-1" />
              </div>
            </div>
            <Button
              onClick={() => handleAction('updateProfessionalInfo')}
              disabled={loading['updateProfessionalInfo']}
            >
              {loading['updateProfessionalInfo'] ? "Updating..." : "Update Professional Info"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label>Working Days</Label>
                <Input defaultValue="Monday - Friday" className="mt-1" />
              </div>
              <div>
                <Label>Working Hours</Label>
                <Input defaultValue="9:00 AM - 5:00 PM" className="mt-1" />
              </div>
            </div>
            <Button
              onClick={() => handleAction('manageAvailability')}
              disabled={loading['manageAvailability']}
            >
              {loading['manageAvailability'] ? "Updating..." : "Update Availability"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

