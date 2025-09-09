"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Mail, Shield } from "lucide-react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useUserStore } from "@/lib/stores/global/UserStore.ts";
import { useForm } from "react-hook-form";
import { updateUserEmail } from "../../../supabase/functions/auth/actions.ts";
import { UpdateEmailTypes } from "@/lib/types/AuthTypes.ts";

const EmailSettings = () => {
  const user = useUserStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: UpdateEmailTypes) => {
    try {
      const res = await updateUserEmail(data.newEmail);
      if (!res.success) {
        alert(res.error || "Failed to update email.");
        return;
      }

      alert(
        "Email update initiated. Please check your new email for verification.",
      );
    } catch (error) {
      console.error("Error updating email:", error);
    }
  };

  return (
    <>
      <Card className="bg-[#16212B] border-[#2C3E50] rounded-xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-[#E5E7EB]">
            <Mail className="h-5 w-5 text-[#3B82F6]" />
            Email Address
          </CardTitle>
          <CardDescription className="text-[#9CA3AF]">
            Update your email address for account notifications and login
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentEmail" className="text-[#E5E7EB]">
                  Current Email
                </Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#9CA3AF]" />
                  <Input
                    id="currentEmail"
                    type="email"
                    value={user.user?.email}
                    readOnly={true}
                    onChange={(e) => setCurrentEmail(e.target.value)}
                    className="flex-1 bg-[#1a1b1e] border-[#374151] text-[#E5E7EB] rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newEmail" className="text-[#E5E7EB]">
                  New Email Address
                </Label>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="h-4 w-4 text-[#9CA3AF]" />
                  <Input
                    placeholder="Enter new email address"
                    className="flex-1 bg-[#1a1b1e] border-[#374151] text-[#E5E7EB] rounded-lg"
                    {...register("newEmail", {
                      required: "New email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                </div>
                {errors.newEmail && (
                  <p className="text-sm text-red-500 ml-7">
                    {String(errors.newEmail.message)}
                  </p>
                )}
              </div>

              <div className="p-4 bg-[#2C3E50]/40 rounded-lg border border-[#374151]">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-[#10B981] mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#E5E7EB]">
                      Email Verification Required
                    </p>
                    <p className="text-sm text-[#9CA3AF]">
                      We'll send a verification link to your new email address.
                      You'll need to confirm it before the change takes effect.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <Button
              type={`submit`}
              className="w-full md:w-auto mt-5 bg-[#3B82F6] hover:bg-[#2563EB] text-[#FFFFFF] rounded-lg"
            >
              Update Email Address
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};
export default EmailSettings;
