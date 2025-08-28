"use client";

import React from "react";
import { CreateCampaignModal } from "@/components/dashboard/analysis/CreateCampaignModal.tsx";
import DisplayAllCampaigns from "@/components/dashboard/analysis/DisplayAllCampaigns.tsx";

const AnalysisPage = () => {
  return (
    <div className="min-h-full bg-[#1a1a1a] flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6">
          <CreateCampaignModal />
          <DisplayAllCampaigns />
        </div>
      </div>
    </div>
  );
};
export default AnalysisPage;
