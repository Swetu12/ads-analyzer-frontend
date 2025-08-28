import { create } from "zustand/react";
import { CampaignStore } from "@/lib/types/AnalysisTypes.ts";

export const useCampaignStore = create<CampaignStore>((set) => ({
  date: {},
  name: "",
  goal: 0,

  setName: (name) => set({ name }),
  setGoal: (goal) => set({ goal }),
  setDate: (date) => set({ date }),
}));
