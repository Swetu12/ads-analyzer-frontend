import { create } from "zustand";
import { supabase } from "@/supabase-config/client.ts";
import { UserStore } from "@/lib/types/AuthTypes.ts";

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    set({ loading: true });
    const { data, error } = await supabase.auth.getUser();
    if (error) console.error("Error fetching user:", error);
    set({ user: data?.user ?? null, loading: false });
  },
}));

supabase.auth.onAuthStateChange((_event, session) => {
  useUserStore.getState().setUser(session?.user ?? null);
});
