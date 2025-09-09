import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface AdPerformanceSectionProps {
  campaign: Campaign;
}

export function AdPerformanceSection({ campaign }: AdPerformanceSectionProps) {
  return (
    <div className="space-y-6">
      {/* Top Performing Ads */}
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#2C82A8]" />
            <h3 className="text-lg font-semibold text-white">Top Performers</h3>
          </div>

          <div className="space-y-3">
            {campaign.top_performing_ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#1B2028] border border-[#2C82A8]/30 rounded-lg p-4"
              >
                <h4 className="font-medium text-white mb-3">{ad.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CTR:</span>
                    <span className="text-[#2C82A8] font-medium">
                      {(ad.ctr * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conv Rate:</span>
                    <span className="text-[#2C82A8] font-medium">
                      {(ad.conversion_rate * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROAS:</span>
                    <span className="text-[#3893BB] font-medium">
                      {(ad.revenue / ad.spend).toFixed(2)}x
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-white font-medium">
                      ${ad.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Lowest Performing Ads */}
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg h-screen">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingDown className="w-5 h-5 text-red-400" />
            <h3 className="text-lg font-semibold text-white">
              Needs Attention
            </h3>
          </div>

          <div className="space-y-3">
            {campaign.lowest_performing_ads.map((ad) => (
              <div
                key={ad.id}
                className="bg-[#1B2028] border border-red-500/30 rounded-lg p-4"
              >
                <h4 className="font-medium text-white mb-3">{ad.title}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CTR:</span>
                    <span className="text-red-400 font-medium">
                      {(ad.ctr * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Conv Rate:</span>
                    <span className="text-red-400 font-medium">
                      {(ad.conversion_rate * 100).toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">ROAS:</span>
                    <span className="text-red-400 font-medium">
                      {(ad.revenue / ad.spend).toFixed(2)}x
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="text-white font-medium">
                      ${ad.revenue.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
