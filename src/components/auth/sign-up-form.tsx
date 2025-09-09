"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { signUpFormData } from "@/lib/types/AuthTypes";
import Link from "next/link";
import {
  githubSignIn,
  googleSignIn,
  signUpNewUser,
} from "../../../supabase/functions/auth/actions.ts";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<signUpFormData>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const password = watch("password");
  const onSubmit = async (data: signUpFormData) => {
    setIsSubmitting(true);
    const response = await signUpNewUser(data);

    if (!response.success) {
      toast.error(response.error || "Something went wrong. Please try again.");
      setIsSubmitting(false);
      return;
    }

    toast.success("Account created successfully!");
    setIsSubmitting(false);
    router.push("/login");
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
                <h1 className="text-2xl font-bold text-white">Welcome</h1>
                <p className="text-gray-400">
                  Create an account to get started
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

              {/* Password */}
              <div className="grid gap-3">
                <Label htmlFor="password" className="text-gray-300">
                  Password
                </Label>
                <Input
                  type="password"
                  required
                  className="bg-[#1B2028] border-[#2C82A8]/30 text-white placeholder:text-gray-500 focus:border-[#2C82A8] focus:ring-[#2C82A8]"
                  {...register("password", {
                    required: "Password is required",
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?~-]).{8,}$/,
                      message:
                        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
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
                  className="bg-[#1B2028] border-[#2C82A8]/30 text-white placeholder:text-gray-500 focus:border-[#2C82A8] focus:ring-[#2C82A8]"
                  {...register("confirmPassword", {
                    required: "Please confirm the password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
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
                className="w-full bg-[#2C82A8] hover:bg-[#3893BB] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Check Email..." : "Sign Up"}
              </Button>

              {/* Divider */}
              <div className="relative text-center text-sm text-gray-400">
                <span className="bg-[#1B2028]/80 px-2 relative z-10">
                  Or continue with
                </span>
                <div className="absolute inset-0 top-1/2 border-t border-[#2C82A8]/30 z-0" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full border-[#2C82A8]/40 bg-[#1B2028] text-white hover:bg-[#2C82A8]/20"
                  onClick={githubSignIn}
                >
                  <GithubIcon />
                  <span className="sr-only">Login with Github</span>
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full border-[#2C82A8]/40 bg-[#1B2028] text-white hover:bg-[#2C82A8]/20"
                  onClick={googleSignIn}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>

              {/* Footer Link */}
              <div className="text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link href="/login" className="text-[#2C82A8] hover:underline">
                  Sign In
                </Link>
              </div>
            </div>
          </form>

          {/* Right Image */}
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

      {/* Terms */}
      <div className="text-gray-500 text-center text-xs">
        By clicking continue, you agree to our{" "}
        <Link href="#" className="text-[#2C82A8] hover:underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-[#2C82A8] hover:underline">
          Privacy Policy
        </Link>
        .
      </div>
    </div>
  );
}
