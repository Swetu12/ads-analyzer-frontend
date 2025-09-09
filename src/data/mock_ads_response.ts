export interface Ad {
  id: string;
  title: string;
  ctr: number;
  conversion_rate: number;
  impressions: number;
  clicks: number;
  spend: number;
  revenue: number;
}

export interface AudienceFeedback {
  sentiment: "positive" | "negative" | "neutral";
  comment: string;
  rating: number;
  demographic: string;
}

export interface PerformanceBreakdown {
  metric: string;
  current: number;
  previous: number;
  change: number;
  trend: "up" | "down" | "stable";
}

export interface Campaign {
  campaign: string;
  score: number;
  top_performing_ads: Ad[];
  lowest_performing_ads: Ad[];
  recommendations: string[];
  advanced_recommendations: string[];
  summary: string;
  feedback: string[];
  suggestions: string[];
  improvements: string[];
  audience_feedback: AudienceFeedback[];
  causes_and_impact: {
    causes: string[];
    impact: string[];
  };
  performance_breakdown: PerformanceBreakdown[];
}

export const campaignData: Campaign[] = [
  {
    campaign: "Bitcoin DeFi Yield",
    score: 87,
    top_performing_ads: [
      {
        id: "a1",
        title: "Earn 12% APY on Bitcoin",
        ctr: 0.089,
        conversion_rate: 0.178,
        impressions: 125000,
        clicks: 11125,
        spend: 8500,
        revenue: 24750,
      },
      {
        id: "a2",
        title: "DeFi Made Simple",
        ctr: 0.076,
        conversion_rate: 0.165,
        impressions: 98000,
        clicks: 7448,
        spend: 6200,
        revenue: 18900,
      },
    ],
    lowest_performing_ads: [
      {
        id: "a3",
        title: "Crypto Staking Guide",
        ctr: 0.032,
        conversion_rate: 0.089,
        impressions: 87000,
        clicks: 2784,
        spend: 5800,
        revenue: 8200,
      },
    ],
    recommendations: [
      "Increase budget allocation to high-yield messaging",
      "A/B test different APY percentages in headlines",
      "Focus on mobile-optimized creatives",
    ],
    advanced_recommendations: [
      "Implement dynamic creative optimization based on real-time yield rates",
      "Use lookalike audiences based on top converters",
      "Deploy sequential retargeting campaigns for abandoned sign-ups",
      "Integrate real-time market sentiment analysis for ad timing",
    ],
    summary:
      "Bitcoin DeFi Yield campaign shows strong performance with high-yield messaging resonating well with target audience. Mobile traffic converting 23% higher than desktop.",
    feedback: [
      "Users respond well to specific APY percentages",
      "Trust indicators significantly improve conversion rates",
      "Mobile experience needs optimization for better UX",
    ],
    suggestions: [
      "Add social proof elements to landing pages",
      "Implement urgency messaging during market volatility",
      "Create video testimonials from successful users",
      "Develop educational content series",
    ],
    improvements: [
      "Reduce landing page load time by 40%",
      "Simplify sign-up process to 3 steps maximum",
      "Add live chat support during peak hours",
      "Implement progressive web app features",
    ],
    audience_feedback: [
      {
        sentiment: "positive",
        comment: "Finally found a platform that explains DeFi clearly",
        rating: 4.5,
        demographic: "25-34 Tech Professionals",
      },
      {
        sentiment: "positive",
        comment: "The yield rates are exactly as advertised",
        rating: 4.8,
        demographic: "35-44 Investors",
      },
      {
        sentiment: "negative",
        comment: "Sign-up process took too long",
        rating: 2.1,
        demographic: "18-25 Students",
      },
    ],
    causes_and_impact: {
      causes: [
        "High market volatility increased interest in stable yields",
        "Competitor price increases drove users to seek alternatives",
        "Influencer endorsements boosted brand awareness",
        "Educational content improved user understanding",
      ],
      impact: [
        "23% increase in qualified leads",
        "15% improvement in customer lifetime value",
        "8% reduction in customer acquisition cost",
        "31% boost in organic referrals",
      ],
    },
    performance_breakdown: [
      {
        metric: "Click-Through Rate",
        current: 6.8,
        previous: 5.2,
        change: 30.8,
        trend: "up",
      },
      {
        metric: "Conversion Rate",
        current: 15.4,
        previous: 12.1,
        change: 27.3,
        trend: "up",
      },
      {
        metric: "Cost Per Click",
        current: 0.76,
        previous: 0.89,
        change: -14.6,
        trend: "up",
      },
      {
        metric: "Return on Ad Spend",
        current: 2.91,
        previous: 2.34,
        change: 24.4,
        trend: "up",
      },
    ],
  },
];

export const overallDashboard = {
  total_campaigns: 1,
  total_impressions: 310000,
  total_clicks: 21357,
  total_spend: 20500,
  total_revenue: 51850,
  average_score: 87,
  average_ctr: 0.0657,
  average_conversion_rate: 0.144,
  average_cpc: 0.96,
  average_roas: 2.53,
  top_performing_ads: [
    {
      id: "a1",
      campaign: "Bitcoin DeFi Yield",
      title: "Earn 12% APY on Bitcoin",
      ctr: 0.089,
      conversion_rate: 0.178,
      roas: 2.91,
    },
  ],
  lowest_performing_ads: [
    {
      id: "a3",
      campaign: "Bitcoin DeFi Yield",
      title: "Crypto Staking Guide",
      ctr: 0.032,
      conversion_rate: 0.089,
      roas: 1.41,
    },
  ],
  aggregated_recommendations: [
    "Increase budget allocation to high-yield messaging",
    "A/B test different APY percentages in headlines",
    "Focus on mobile-optimized creatives",
    "Add social proof elements to landing pages",
    "Implement urgency messaging during market volatility",
  ],
  trends: {
    ctr_change_percent: 30.8,
    conversion_change_percent: 27.3,
    roas_change_percent: 24.4,
  },
  audience_feedback_summary: {
    positive_count: 2,
    negative_count: 1,
    average_rating: 3.8,
    top_demographics: ["25-34 Tech Professionals", "35-44 Investors"],
    common_feedback: [
      "Sign-up process took too long",
      "Users respond well to specific APY percentages",
    ],
  },
  causes_and_impact_summary: {
    causes: [
      "High market volatility increased interest in stable yields",
      "Competitor price increases drove users to seek alternatives",
      "Influencer endorsements boosted brand awareness",
    ],
    impact: [
      "23% increase in qualified leads",
      "15% improvement in customer lifetime value",
      "8% reduction in customer acquisition cost",
    ],
  },
  performance_breakdown_summary: [
    {
      metric: "Click-Through Rate",
      average: 6.8,
      trend: "up",
    },
    {
      metric: "Conversion Rate",
      average: 15.4,
      trend: "up",
    },
    {
      metric: "Cost Per Click",
      average: 0.76,
      trend: "up",
    },
    {
      metric: "Return on Ad Spend",
      average: 2.91,
      trend: "up",
    },
  ],
};

// Mock data for charts
export const revenueOverTimeData = [
  { month: "Jan", revenue: 4200, spend: 2100 },
  { month: "Feb", revenue: 3800, spend: 1900 },
  { month: "Mar", revenue: 5200, spend: 2600 },
  { month: "Apr", revenue: 4800, spend: 2400 },
  { month: "May", revenue: 6100, spend: 3050 },
  { month: "Jun", revenue: 5850, spend: 2925 },
  { month: "Jul", revenue: 7200, spend: 3600 },
  { month: "Aug", revenue: 6800, spend: 3400 },
  { month: "Sep", revenue: 8100, spend: 4050 },
  { month: "Oct", revenue: 7600, spend: 3800 },
  { month: "Nov", revenue: 9200, spend: 4600 },
  { month: "Dec", revenue: 8900, spend: 4450 },
];

export const monthlyPerformanceData = [
  { month: "Jan", impressions: 25000, clicks: 1750, conversions: 245 },
  { month: "Feb", impressions: 28000, clicks: 1960, conversions: 274 },
  { month: "Mar", impressions: 32000, clicks: 2240, conversions: 313 },
  { month: "Apr", impressions: 29000, clicks: 2030, conversions: 284 },
  { month: "May", impressions: 35000, clicks: 2450, conversions: 343 },
  { month: "Jun", impressions: 31000, clicks: 2170, conversions: 304 },
];

export const campaignDistributionData = [
  { name: "Bitcoin DeFi", value: 45, color: "#3B82F6" },
  { name: "Crypto Staking", value: 25, color: "#10B981" },
  { name: "Trading Signals", value: 20, color: "#8B5CF6" },
  { name: "NFT Marketplace", value: 10, color: "#FACC15" },
];

export const weeklyActivityData = [
  { day: "Mon", activity: 85 },
  { day: "Tue", activity: 92 },
  { day: "Wed", activity: 78 },
  { day: "Thu", activity: 95 },
  { day: "Fri", activity: 88 },
  { day: "Sat", activity: 72 },
  { day: "Sun", activity: 65 },
];
