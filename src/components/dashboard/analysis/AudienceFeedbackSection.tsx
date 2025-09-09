import React from "react";
import { Users, Star, ThumbsUp, ThumbsDown, Minus } from "lucide-react";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";

interface AudienceFeedbackSectionProps {
  campaign: Campaign;
}

export function AudienceFeedbackSection({
  campaign,
}: AudienceFeedbackSectionProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <ThumbsUp className="w-4 h-4 text-[#2C82A8]" />;
      case "negative":
        return <ThumbsDown className="w-4 h-4 text-red-400" />;
      default:
        return <Minus className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "border-[#2C82A8]/40 bg-[#2C82A820]";
      case "negative":
        return "border-red-500/20 bg-red-500/10";
      default:
        return "border-yellow-500/20 bg-yellow-500/10";
    }
  };

  const avgRating =
    campaign.audience_feedback.reduce(
      (sum, feedback) => sum + feedback.rating,
      0,
    ) / campaign.audience_feedback.length;

  return (
    <Card className="bg-[#1B2028]/50 border border-[#2C82A8]/40 rounded-2xl shadow-lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-[#3893BB]" />
            <h3 className="text-lg font-semibold text-white">
              Audience Feedback
            </h3>
          </div>
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-white font-medium">
              {avgRating.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">avg rating</span>
          </div>
        </div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {campaign.audience_feedback.map((feedback, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 ${getSentimentColor(feedback.sentiment)}`}
            >
              <div className="flex items-center justify-between mb-2">
                {getSentimentIcon(feedback.sentiment)}
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-gray-300">
                    {feedback.rating}
                  </span>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-2">"{feedback.comment}"</p>
              <p className="text-xs text-gray-500">{feedback.demographic}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
