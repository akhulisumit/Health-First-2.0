"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})

  const handleSave = (section: string) => {
    setLoading(prev => ({ ...prev, [section]: true }))
    setTimeout(() => {
      setLoading(prev => ({ ...prev, [section]: false }))
      console.log(`Saved ${section}`)
    }, 1000)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="dr.smith@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" />
              </div>
            </div>
            <Button 
              onClick={() => handleSave('account')}
              disabled={loading['account']}
              className="w-full sm:w-auto"
            >
              {loading['account'] ? "Saving..." : "Update Information"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex-grow">Email Notifications</Label>
              <Switch
                id="email-notifications"
                checked={emailNotifications}
                onCheckedChange={setEmailNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="sms-notifications" className="flex-grow">SMS Notifications</Label>
              <Switch
                id="sms-notifications"
                checked={smsNotifications}
                onCheckedChange={setSmsNotifications}
              />
            </div>
            <Button 
              onClick={() => handleSave('notifications')}
              disabled={loading['notifications']}
              className="w-full sm:w-auto"
            >
              {loading['notifications'] ? "Saving..." : "Save Preferences"}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <Button 
              onClick={() => handleSave('password')}
              disabled={loading['password']}
              className="w-full sm:w-auto"
            >
              {loading['password'] ? "Changing..." : "Change Password"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

