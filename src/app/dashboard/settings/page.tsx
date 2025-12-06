import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6 pb-20">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
        <p className="text-gray-600">
          Manage your profile details and security preferences.
        </p>
      </div>

      {/* PROFILE SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account's profile information and email address.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" placeholder="e.g. John Doe" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="e.g. john@example.com" defaultValue="john@example.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" type="tel" placeholder="+62 812..." defaultValue="+62 812 3456 7890" />
          </div>
          
          <div className="flex justify-end pt-4">
            <Button className="bg-[#39D177] hover:bg-[#2FAE63] text-white rounded-full px-6">
              Save Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SECURITY SETTINGS */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Ensure your account is secure by setting a strong password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input id="newPassword" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input id="confirmPassword" type="password" />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button variant="outline" className="mr-2 rounded-full">
              Cancel
            </Button>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-full px-6">
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
