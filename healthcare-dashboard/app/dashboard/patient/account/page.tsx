import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function Account() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Account</h1>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg" alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Button>Change Picture</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Full Name</Label>
                <p className="text-lg">John Doe</p>
              </div>
              <div>
                <Label>Date of Birth</Label>
                <p className="text-lg">January 1, 1990</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-lg">john.doe@example.com</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p className="text-lg">+1 (555) 123-4567</p>
              </div>
            </div>
            <Button>Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Blood Type</Label>
                <p className="text-lg">A+</p>
              </div>
              <div>
                <Label>Height</Label>
                <p className="text-lg">180 cm</p>
              </div>
              <div>
                <Label>Weight</Label>
                <p className="text-lg">75 kg</p>
              </div>
              <div>
                <Label>Allergies</Label>
                <p className="text-lg">Penicillin, Peanuts</p>
              </div>
            </div>
            <Button>Update Health Information</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <p className="text-lg">Jane Doe</p>
              </div>
              <div>
                <Label>Relationship</Label>
                <p className="text-lg">Spouse</p>
              </div>
              <div>
                <Label>Phone</Label>
                <p className="text-lg">+1 (555) 987-6543</p>
              </div>
              <div>
                <Label>Email</Label>
                <p className="text-lg">jane.doe@example.com</p>
              </div>
            </div>
            <Button>Edit Emergency Contact</Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

