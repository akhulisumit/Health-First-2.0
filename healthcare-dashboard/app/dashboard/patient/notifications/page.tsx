'use client'
import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, Calendar, FileText } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Search } from 'lucide-react'

export default function Notifications() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const [markAsReadLoading, setMarkAsReadLoading] = useState<{ [key: number]: boolean }>({})
  const [notifications, setNotifications] = useState([
    { id: 1, type: "appointment", message: "Reminder: You have an appointment with Dr. Smith tomorrow at 10:00 AM.", read: false },
    { id: 2, type: "report", message: "Your recent blood test results are now available.", read: false },
    { id: 3, type: "medication", message: "It's time to refill your prescription for Lisinopril.", read: false },
    { id: 4, type: "appointment", message: "Your appointment request with Dr. Johnson has been confirmed for next week.", read: false },
  ])
  const [filteredNotifications, setFilteredNotifications] = useState(notifications)

  const getIcon = (type: string) => {
    switch (type) {
      case "appointment":
        return <Calendar className="h-5 w-5 text-blue-500" />
      case "report":
        return <FileText className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-yellow-500" />
    }
  }

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)
    setSearchLoading(true)

    const filtered = notifications.filter(notification =>
      notification.message.toLowerCase().includes(term.toLowerCase())
    )
    setFilteredNotifications(filtered)
    setSearchLoading(false)
  }, [notifications])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = notifications.filter(notification =>
        notification.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredNotifications(filtered)
      setSearchLoading(false)
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, notifications])

  const handleMarkAsRead = (id: number) => {
    setMarkAsReadLoading(prev => ({ ...prev, [id]: true }))
    setTimeout(() => {
      setNotifications(prevNotifications =>
        prevNotifications.map(notification =>
          notification.id === id ? { ...notification, read: !notification.read } : notification
        )
      )
      setMarkAsReadLoading(prev => ({ ...prev, [id]: false }))
    }, 1000)
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Notifications</h1>
      <div className="relative mb-4 w-full max-w-md mx-auto">
        <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${searchLoading ? 'animate-spin' : ''}`} />
        <Input
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 w-full"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <div key={notification.id} className={`flex items-start space-x-4 p-4 rounded-lg ${notification.read ? 'bg-green-50' : 'bg-gray-50'}`}>
                {getIcon(notification.type)}
                <div className="flex-1">
                  <p>{notification.message}</p>
                </div>
                <Button
                  variant={notification.read ? "outline" : "ghost"}
                  size="sm"
                  onClick={() => handleMarkAsRead(notification.id)}
                  disabled={markAsReadLoading[notification.id]}
                  className={notification.read ? "text-green-600 hover:text-green-700" : ""}
                >
                  {markAsReadLoading[notification.id] ? "Loading..." : (notification.read ? "Mark as Unread" : "Mark as Read")}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

