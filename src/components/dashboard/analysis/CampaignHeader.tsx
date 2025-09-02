import React from "react";
import { TrendingUp, ChevronDown } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CampaignHeaderProps {
  campaigns: Campaign[];
  selectedCampaign: string;
  onSelectCampaign: (campaign: string) => void;
}

export function CampaignHeader({
  campaigns,
  selectedCampaign,
  onSelectCampaign,
}: CampaignHeaderProps) {
  return (
    <div className="bg-[#1a1b1e] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                CryptoAds Analytics
              </h1>
              <p className="text-gray-400 text-sm">
                Advanced campaign performance insights
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleString()}
            </div>
            <Select value={selectedCampaign} onValueChange={onSelectCampaign}>
              <SelectTrigger className="w-64 bg-[#0A0B0E] border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1b1e] border-gray-700">
                {campaigns.map((campaign) => (
                  <SelectItem
                    key={campaign.campaign}
                    value={campaign.campaign}
                    className="text-white hover:bg-gray-800 focus:bg-gray-800"
                  >
                    {campaign.campaign}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
