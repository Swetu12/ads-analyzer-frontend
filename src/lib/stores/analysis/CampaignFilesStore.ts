import { create } from "zustand/react";
import { CampaignFilesStore } from "@/lib/types/AnalysisTypes.ts";

export const useCampaignFilesStore = create<CampaignFilesStore>((set) => ({
  isOpen: false,
  selectedFile: null,
  uploading: false,

  setIsOpen: (isOpen) => set({ isOpen }),
  setSelectedFile: (selectedFile) => set({ selectedFile }),
  setUploading: (uploading) => set({ uploading }),
}));
