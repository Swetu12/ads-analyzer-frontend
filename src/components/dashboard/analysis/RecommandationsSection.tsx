import React from "react";
import { Target, Cpu } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface RecommendationsSectionProps {
  campaign: Campaign;
}

export function RecommendationsSection({
  campaign,
}: RecommendationsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Basic Recommendations */}
      <Card className="bg-[#1a1b1e] border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              Recommendations
            </h3>
          </div>

          <div className="space-y-4">
            {campaign.recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-green-500/10 border border-green-500/20 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">
                      {index + 1}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Advanced Recommendations */}
      <Card className="bg-[#1a1b1e] border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-semibold text-white">
              Advanced Recommendations
            </h3>
          </div>

          <div className="space-y-4">
            {campaign.advanced_recommendations.map((item, index) => (
              <div
                key={index}
                className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Cpu className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-gray-300 text-sm">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
