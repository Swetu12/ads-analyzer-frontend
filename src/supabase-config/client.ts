import { createBrowserClient } from "@supabase/ssr";

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  {
    cookies: {
      get(name: string) {
        if (typeof document === "undefined") return undefined;
        const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
        return match ? decodeURIComponent(match[1]) : undefined;
      },
      set(name: string, value: string, options?: { maxAge?: number; path?: string; domain?: string; secure?: boolean; sameSite?: "lax" | "strict" | "none" }) {
        if (typeof document === "undefined") return;
        let cookie = `${name}=${encodeURIComponent(value)}`;
        const opts = { path: "/", ...options };
        if (opts.maxAge) cookie += `; Max-Age=${opts.maxAge}`;
        if (opts.domain) cookie += `; Domain=${opts.domain}`;
        if (opts.path) cookie += `; Path=${opts.path}`;
        if (opts.secure) cookie += `; Secure`;
        if (opts.sameSite) cookie += `; SameSite=${opts.sameSite}`;
        document.cookie = cookie;
      },
      remove(name: string, options?: { path?: string; domain?: string }) {
        if (typeof document === "undefined") return;
        document.cookie = `${name}=; Max-Age=0; Path=${options?.path || "/"}${options?.domain ? `; Domain=${options.domain}` : ""}`;
      },
    },
  }
);
