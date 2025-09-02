import React from "react";
import { AlertCircle, TrendingUp } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface CausesImpactSectionProps {
  campaign: Campaign;
}

export function CausesImpactSection({ campaign }: CausesImpactSectionProps) {
  return (
    <Card className="bg-[#1a1b1e] border-gray-800">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <AlertCircle className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">Causes & Impact</h3>
        </div>

        <div className="space-y-6">
          {/* Causes */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Root Causes
            </h4>
            <div className="space-y-2">
              {campaign.causes_and_impact.causes.map((cause, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{cause}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div>
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Business Impact
            </h4>
            <div className="space-y-2">
              {campaign.causes_and_impact.impact.map((impact, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">{impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
