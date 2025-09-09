import React from "react";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

const Page = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-6xl">
        <LoginForm />
      </div>
    </div>
  );
};
export default Page;
