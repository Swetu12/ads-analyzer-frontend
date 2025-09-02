import React from "react";
import { Campaign } from "@/data/mock_ads_response.ts";
import { CampaignHeader } from "@/components/dashboard/analysis/CampaignHeader.tsx";
import { ScoreSection } from "@/components/dashboard/analysis/ScoreSection.tsx";
import { SummarySection } from "@/components/dashboard/analysis/SummarySection.tsx";
import { PerformanceCharts } from "@/components/dashboard/analysis/PerformanceCharts.tsx";
import { AdPerformanceSection } from "@/components/dashboard/analysis/AdPerformanceSection.tsx";
import { FeedbackSection } from "@/components/dashboard/analysis/FeedbackSection.tsx";
import { RecommendationsSection } from "@/components/dashboard/analysis/RecommandationsSection.tsx";
import { AudienceFeedbackSection } from "@/components/dashboard/analysis/AudienceFeedbackSection.tsx";
import { CausesImpactSection } from "@/components/dashboard/analysis/CausesImpactSection.tsx";
import { PerformanceBreakdownSection } from "@/components/dashboard/analysis/PerformanceBreakDownSection.tsx";

interface DashboardProps {
  campaigns: Campaign[];
  selectedCampaign: string;
  onSelectCampaign: (campaign: string) => void;
}

export function Dashboard({
  campaigns,
  selectedCampaign,
  onSelectCampaign,
}: DashboardProps) {
  const currentCampaign = campaigns.find(
    (c) => c.campaign === selectedCampaign,
  );

  if (!currentCampaign) return null;

  return (
    <div className="min-h-screen">
      <div className="max-w-12xl mx-auto px-4 py-6 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ScoreSection campaign={currentCampaign} />
            <SummarySection campaign={currentCampaign} />
            <PerformanceCharts campaign={currentCampaign} />
          </div>
          <div className="space-y-6">
            <AdPerformanceSection campaign={currentCampaign} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeedbackSection campaign={currentCampaign} />
          <RecommendationsSection campaign={currentCampaign} />
        </div>

        <AudienceFeedbackSection campaign={currentCampaign} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CausesImpactSection campaign={currentCampaign} />
          <PerformanceBreakdownSection campaign={currentCampaign} />
        </div>
      </div>
    </div>
  );
}
