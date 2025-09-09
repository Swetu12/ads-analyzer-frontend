"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ForgotPasswordFormData } from "@/lib/types/AuthTypes";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { resetPassword } from "../../../supabase/functions/auth/actions.ts";
import Image from "next/image";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const response = await resetPassword(data);

    if (!response.success) {
      toast.error(response.error || "Something went wrong. Please try again.");
      return;
    } else {
      toast.success("✅ Check your email for the password reset link.");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Toaster position="top-center" richColors />
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-white">
                  Forgot Password
                </h1>
                <p className="text-gray-400">
                  Enter your email and we’ll send you a reset link
                </p>
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-gray-300">
                  Email
                </Label>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="bg-[#1B2028] border-[#2C82A8]/30 text-white placeholder:text-gray-500 focus:border-[#2C82A8] focus:ring-[#2C82A8]"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">
                    {String(errors.email.message)}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#2C82A8] hover:bg-[#3893BB] text-white"
              >
                Send Reset Link
              </Button>

              {/* Back to login */}
              <div className="text-center text-sm text-gray-400">
                Remembered your password?{" "}
                <Link href="/login" className="text-[#2C82A8] hover:underline">
                  Login
                </Link>
              </div>
            </div>
          </form>

          {/* Right-side image */}
          <div className="border-l relative hidden md:block">
            <Image
              src={`/logo.svg`}
              alt={`logo`}
              width={50}
              height={50}
              className={`absolute inset-0 h-full w-full p-10 opacity-30`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
