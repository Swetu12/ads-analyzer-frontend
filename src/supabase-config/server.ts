import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const supabaseServer = () =>
  createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies,
    }
  );
