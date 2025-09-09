import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Lock } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";

const PasswordSettings = () => {
  return (
    <>
      <Card className="bg-[#16212B] border-[#2C3E50] rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#E5E7EB]">
            <Lock className="h-5 w-5 text-[#3B82F6]" />
            Password & Security
          </CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            Change your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-[#E5E7EB]">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                placeholder="Enter current password"
                className="bg-[#1a1b1e] border-[#374151] text-[#E5E7EB] rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-[#E5E7EB]">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                className="bg-[#1a1b1e] border-[#374151] text-[#E5E7EB] rounded-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[#E5E7EB]">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                className="bg-[#1a1b1e] border-[#374151] text-[#E5E7EB] rounded-lg"
              />
            </div>

            <div className="p-4 bg-[#2C3E50]/40 rounded-lg border border-[#374151]">
              <div className="space-y-2">
                <p className="text-sm font-medium text-[#E5E7EB]">
                  Password Requirements:
                </p>
                <ul className="text-sm text-[#9CA3AF] space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Include uppercase and lowercase letters</li>
                  <li>• Include at least one number</li>
                  <li>• Include at least one special character</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="border-[#374151]" />

          <div className="space-y-4">
            <h4 className="font-medium text-[#E5E7EB]">Password Reset</h4>
            <p className="text-sm text-[#9CA3AF]">
              Forgot your current password? We can send you a secure reset link
              via email.
            </p>
            <Button className="w-full md:w-auto bg-transparent border border-[#3B82F6] text-[#3B82F6] hover:bg-[#2563EB]/30 rounded-lg">
              Send Password Reset Email
            </Button>
          </div>

          <Button className="w-full md:w-auto bg-[#3B82F6] hover:bg-[#2563EB] text-[#FFFFFF] rounded-lg">
            Update Password
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
export default PasswordSettings;
