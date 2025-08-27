"use client";

import React from "react";
import { Button } from "@/components/ui/button.tsx";
import { signOutUser } from "../../../../supabase/functions/auth/actions.ts";

const Page = () => {
  return (
    <>
      <Button variant={`outline`} onClick={signOutUser}>
        Sign Out
      </Button>
    </>
  );
};
export default Page;
