import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";
import { Button } from "@/components/ui/button.tsx";

const DangerZoneSettings = () => {
  return (
    <>
      <Card className="bg-[#16212B] border-[#DC2626]/20 rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#DC2626]">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            Irreversible actions that will permanently affect your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-6 border border-[#DC2626]/20 rounded-lg bg-[#DC2626]/10 space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-[#DC2626] mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium text-[#DC2626]">Delete Account</p>
                <p className="text-sm text-[#9CA3AF]">
                  Permanently delete your account and all associated data. This
                  action cannot be undone.
                </p>
              </div>
            </div>

            <Separator className="border-[#DC2626]/20" />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-transparent border border-[#3B82F6] text-[#3B82F6] hover:bg-[#2563EB]/30 rounded-lg">
                Download My Data
              </Button>
              <Button className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C] text-[#FFFFFF] rounded-lg">
                Delete Account Permanently
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default DangerZoneSettings;
