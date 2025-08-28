import { create } from "zustand/react";
import { CampaignGlobalStore } from "@/lib/types/AnalysisTypes.ts";
import { supabase } from "@/supabase-config/client.ts";

export const useCampaignGlobalStore = create<CampaignGlobalStore>(
  (set, get) => {
    return {
      campaigns: [],
      loading: false,
      error: null,

      fetchCampaigns: async () => {
        set({ loading: true, error: null });
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          set({ error: "User not signed in", loading: false });
          return;
        }

        const { data, error } = await supabase
          .from("campaigns")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          set({ error: error.message, loading: false });
        } else {
          set({ campaigns: data || [], loading: false });
          console.log("fetched campaigns", data);
        }
      },

      addCampaign: (campaign) => {
        set((state) => ({ campaigns: [campaign, ...state.campaigns] }));
      },
    };
  },
);
