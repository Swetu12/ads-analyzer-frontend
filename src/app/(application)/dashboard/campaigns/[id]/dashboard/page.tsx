"use client";

import React from "react";
import { Dashboard } from "@/components/dashboard/analysis/Dashboard.tsx";
import { campaignData } from "@/data/mock_ads_response.ts";
import { useState } from "react";

const Page = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<string>(
    campaignData[0].campaign,
  );

  return (
    <div className="min-h-screen text-white">
      <Dashboard
        campaigns={campaignData}
        selectedCampaign={selectedCampaign}
        onSelectCampaign={setSelectedCampaign}
      />
    </div>
  );
};
export default Page;
