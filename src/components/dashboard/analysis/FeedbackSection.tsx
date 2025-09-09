import React from "react";
import { MessageSquare, Lightbulb, Zap } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface FeedbackSectionProps {
  campaign: Campaign;
}

export function FeedbackSection({ campaign }: FeedbackSectionProps) {
  return (
    <div className="space-y-6">
      {/* Feedback */}
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <MessageSquare className="w-5 h-5 text-[#2C82A8]" />
            <h3 className="text-lg font-semibold text-white">Feedback</h3>
          </div>

          <div className="space-y-3">
            {campaign.feedback.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#2C82A8] rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Suggestions */}
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Suggestions</h3>
          </div>

          <div className="space-y-3">
            {campaign.suggestions.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Improvements */}
      <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Improvements</h3>
          </div>

          <div className="space-y-3">
            {campaign.improvements.map((item, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
