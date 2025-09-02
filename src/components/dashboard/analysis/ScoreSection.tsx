import React from "react";
import { Award, TrendingUp } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface ScoreSectionProps {
  campaign: Campaign;
}

export function ScoreSection({ campaign }: ScoreSectionProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return "from-green-500 to-green-600";
    if (score >= 60) return "from-yellow-500 to-yellow-600";
    return "from-red-500 to-red-600";
  };

  return (
    <Card className="bg-[#1a1b1e] border-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Award className="w-6 h-6 text-green-400" />
          <h2 className="text-xl font-semibold text-white">Campaign Score</h2>
        </div>

        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center">
              <div
                className={`w-28 h-28 rounded-full bg-gradient-to-br ${getScoreGradient(campaign.score)} flex items-center justify-center`}
              >
                <span className="text-3xl font-bold text-white">
                  {campaign.score}
                </span>
              </div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="bg-[#0A0B0E] px-3 py-1 rounded-full border border-gray-700">
                <span className="text-xs text-gray-400">out of 100</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-400">
              {campaign.top_performing_ads.length}
            </p>
            <p className="text-xs text-gray-400">Top Ads</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">
              {(
                (campaign.top_performing_ads.reduce(
                  (sum, ad) => sum + ad.ctr,
                  0,
                ) /
                  campaign.top_performing_ads.length) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="text-xs text-gray-400">Avg CTR</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">
              {(
                (campaign.top_performing_ads.reduce(
                  (sum, ad) => sum + ad.conversion_rate,
                  0,
                ) /
                  campaign.top_performing_ads.length) *
                100
              ).toFixed(1)}
              %
            </p>
            <p className="text-xs text-gray-400">Avg Conv</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
