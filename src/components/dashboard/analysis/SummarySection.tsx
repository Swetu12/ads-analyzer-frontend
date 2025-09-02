import React from "react";
import { FileText, Calendar } from "lucide-react";
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
    <Card className="bg-[#1a1b1e] border-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <FileText className="w-5 h-5 text-green-400" />
          <h3 className="text-lg font-semibold text-white">Campaign Summary</h3>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">{campaign.summary}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-green-400">
              ${totalSpend.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">Total Spend</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400">Total Revenue</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-4 text-center">
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
