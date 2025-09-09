import React from "react";
import { FileText } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface SummarySectionProps {
  campaign: Campaign;
}

export function SummarySection({ campaign }: SummarySectionProps) {
  const totalSpend = [
    ...campaign.top_performing_ads,
    ...campaign.lowest_performing_ads,
  ].reduce((sum, ad) => sum + ad.spend, 0);

  const totalRevenue = [
    ...campaign.top_performing_ads,
    ...campaign.lowest_performing_ads,
  ].reduce((sum, ad) => sum + ad.revenue, 0);

  const roas = totalRevenue / totalSpend;

  return (
    <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-[#3893BB]" />
          <h3 className="text-lg font-semibold text-white">Campaign Summary</h3>
        </div>

        {/* Summary Text */}
        <p className="text-gray-300 mb-6 leading-relaxed">{campaign.summary}</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#1B2028] rounded-lg p-4 text-center border border-[#2C82A8]/30">
            <p className="text-2xl font-bold text-[#2C82A8]">
              ${totalSpend.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">Total Spend</p>
          </div>
          <div className="bg-[#1B2028] rounded-lg p-4 text-center border border-[#2C82A8]/30">
            <p className="text-2xl font-bold text-[#3893BB]">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">Total Revenue</p>
          </div>
          <div className="bg-[#1B2028] rounded-lg p-4 text-center border border-[#2C82A8]/30">
            <p className="text-2xl font-bold text-purple-400">
              {roas.toFixed(2)}x
            </p>
            <p className="text-sm text-gray-400">ROAS</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
