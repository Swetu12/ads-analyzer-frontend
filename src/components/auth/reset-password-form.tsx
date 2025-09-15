"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { updatePassword } from "../../../supabase/functions/auth/actions.ts";

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>();

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    const response = await updatePassword(data);

    if (!response.success) {
      toast.error(response.error || "Something went wrong. Please try again.");
      return;
    } else {
      toast.success("✅ Password updated! Redirecting to login...");
      setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div
      className={cn(
        "bg-[#1B2028]/50 flex flex-col gap-6 h-screen items-center justify-center max-w-12xl",
        className,
      )}
      {...props}
    >
      <Toaster position="top-center" richColors />
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              {/* Header */}
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-white">
                  Reset Password
                </h1>
                <p className="text-gray-400">Enter your new password below</p>
              </div>

              {/* Password */}
              <div className="grid gap-3">
                <Label htmlFor="password" className="text-gray-300">
                  New Password
                </Label>
                <Input
                  type="password"
                  placeholder="********"
                  className="bg-[#1B2028] border-[#2C82A8]/30 text-white placeholder:text-gray-500 focus:border-[#2C82A8] focus:ring-[#2C82A8]"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {String(errors.password.message)}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="grid gap-3">
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Confirm Password
                </Label>
                <Input
                  type="password"
                  placeholder="********"
                  className="bg-[#1B2028] border-[#2C82A8]/30 text-white placeholder:text-gray-500 focus:border-[#2C82A8] focus:ring-[#2C82A8]"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400">
                    {String(errors.confirmPassword.message)}
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full bg-[#2C82A8] hover:bg-[#3893BB] text-white cursor-pointer"
              >
                Update Password
              </Button>
            </div>
          </form>

          {/* Right-side image */}
          <div className="border-l relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="image"
              className="absolute inset-0 h-full w-full p-10 opacity-30"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
