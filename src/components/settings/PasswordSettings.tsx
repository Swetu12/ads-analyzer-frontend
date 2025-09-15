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
import { useRouter } from "next/navigation";
import { signOutUser } from "../../../supabase/functions/auth/actions.ts";

const PasswordSettings = () => {
  const router = useRouter();

  const onSubmit = async () => {
    try {
      const res = await signOutUser();
      if (!res.success) {
        console.error("Error signing out:", res.error);
        return;
      }

      router.push("/forgot-password");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
          <Separator className="border-[#374151]" />

          <Button
            className="w-full md:w-auto bg-[#3B82F6] hover:bg-[#2563EB] text-[#FFFFFF] rounded-lg cursor-pointer"
            onClick={onSubmit}
          >
            Update Password
          </Button>
        </CardContent>
      </Card>
    </>
  );
};
export default PasswordSettings;
