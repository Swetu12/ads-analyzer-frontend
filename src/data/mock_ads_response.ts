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
  {
    campaign: "NFT Marketplace Launch",
    score: 72,
    top_performing_ads: [
      {
        id: "a4",
        title: "Mint Your First NFT",
        ctr: 0.071,
        conversion_rate: 0.143,
        impressions: 156000,
        clicks: 11076,
        spend: 12400,
        revenue: 19800,
      },
    ],
    lowest_performing_ads: [
      {
        id: "a5",
        title: "Digital Art Revolution",
        ctr: 0.041,
        conversion_rate: 0.098,
        impressions: 134000,
        clicks: 5494,
        spend: 9800,
        revenue: 11200,
      },
    ],
    recommendations: [
      "Focus on practical NFT use cases rather than abstract concepts",
      "Target younger demographics with gaming-focused creatives",
      "Emphasize low gas fees and easy minting process",
    ],
    advanced_recommendations: [
      "Implement cross-platform attribution tracking",
      "Use AI-powered creative generation for personalized ads",
      "Deploy geo-targeted campaigns based on crypto adoption rates",
      "Integrate with Discord and Twitter for community-driven marketing",
    ],
    summary:
      "NFT Marketplace campaign performing moderately with room for improvement. Gaming and utility-focused messaging outperforming art-centric approaches.",
    feedback: [
      "Users prefer practical applications over artistic value",
      "Gas fee concerns are major conversion barriers",
      "Mobile minting experience needs significant improvement",
    ],
    suggestions: [
      "Partner with popular gaming influencers",
      "Create step-by-step minting tutorials",
      "Offer gas fee subsidies for first-time users",
      "Develop mobile-first minting interface",
    ],
    improvements: [
      "Integrate Layer 2 solutions for lower fees",
      "Add preview functionality before minting",
      "Implement batch minting capabilities",
      "Create comprehensive FAQ section",
    ],
    audience_feedback: [
      {
        sentiment: "neutral",
        comment: "Interface is clean but minting process is confusing",
        rating: 3.2,
        demographic: "18-25 Gamers",
      },
      {
        sentiment: "negative",
        comment: "Gas fees are too high for small transactions",
        rating: 2.4,
        demographic: "25-34 Artists",
      },
      {
        sentiment: "positive",
        comment: "Love the gaming NFT collections",
        rating: 4.1,
        demographic: "18-25 Gamers",
      },
    ],
    causes_and_impact: {
      causes: [
        "NFT market correction reduced overall interest",
        "High gas fees deterred small-scale creators",
        "Gaming partnerships increased utility perception",
        "Educational content improved user onboarding",
      ],
      impact: [
        "12% decrease in average transaction value",
        "18% increase in gaming-related NFT sales",
        "25% improvement in user retention",
        "8% reduction in support ticket volume",
      ],
    },
    performance_breakdown: [
      {
        metric: "Click-Through Rate",
        current: 5.6,
        previous: 4.8,
        change: 16.7,
        trend: "up",
      },
      {
        metric: "Conversion Rate",
        current: 12.1,
        previous: 14.2,
        change: -14.8,
        trend: "down",
      },
      {
        metric: "Cost Per Click",
        current: 1.12,
        previous: 0.98,
        change: 14.3,
        trend: "down",
      },
      {
        metric: "Return on Ad Spend",
        current: 1.59,
        previous: 1.87,
        change: -15.0,
        trend: "down",
      },
    ],
  },
  {
    campaign: "Ethereum Staking Pool",
    score: 94,
    top_performing_ads: [
      {
        id: "a6",
        title: "Stake ETH, Earn Rewards",
        ctr: 0.095,
        conversion_rate: 0.189,
        impressions: 187000,
        clicks: 17765,
        spend: 14200,
        revenue: 42300,
      },
    ],
    lowest_performing_ads: [
      {
        id: "a7",
        title: "Ethereum 2.0 Benefits",
        ctr: 0.048,
        conversion_rate: 0.112,
        impressions: 92000,
        clicks: 4416,
        spend: 7800,
        revenue: 12100,
      },
    ],
    recommendations: [
      "Scale successful staking reward messaging",
      "Reduce technical jargon in ad copy",
      "Emphasize passive income benefits",
    ],
    advanced_recommendations: [
      "Implement yield-based dynamic bidding strategies",
      "Use machine learning for optimal ad scheduling",
      "Deploy cross-chain marketing for multi-asset stakers",
      "Integrate with DeFi protocols for enhanced targeting",
    ],
    summary:
      "Ethereum Staking Pool campaign exceeding expectations with strong conversion rates. Reward-focused messaging significantly outperforming technical explanations.",
    feedback: [
      "Clear reward structure drives higher engagement",
      "Users appreciate transparent fee structure",
      "Staking calculator tool increases conversion confidence",
    ],
    suggestions: [
      "Add real-time reward tracking dashboard",
      "Create educational webinar series",
      "Implement referral reward program",
      "Develop mobile staking app",
    ],
    improvements: [
      "Add one-click staking functionality",
      "Implement auto-compounding options",
      "Create detailed reward history tracking",
      "Add portfolio diversification tools",
    ],
    audience_feedback: [
      {
        sentiment: "positive",
        comment: "Best staking platform I've used, very transparent",
        rating: 4.7,
        demographic: "35-44 Investors",
      },
      {
        sentiment: "positive",
        comment: "Love the automatic reward compounding",
        rating: 4.6,
        demographic: "25-34 Tech Professionals",
      },
      {
        sentiment: "neutral",
        comment: "Would like more educational resources",
        rating: 3.8,
        demographic: "45-54 Traditional Investors",
      },
    ],
    causes_and_impact: {
      causes: [
        "Ethereum merge increased staking interest",
        "Competitive reward rates attracted new users",
        "Simplified onboarding reduced friction",
        "Strong security reputation built trust",
      ],
      impact: [
        "45% increase in total value locked",
        "32% improvement in user retention",
        "19% reduction in customer acquisition cost",
        "28% boost in average stake amount",
      ],
    },
    performance_breakdown: [
      {
        metric: "Click-Through Rate",
        current: 7.2,
        previous: 6.1,
        change: 18.0,
        trend: "up",
      },
      {
        metric: "Conversion Rate",
        current: 15.1,
        previous: 13.8,
        change: 9.4,
        trend: "up",
      },
      {
        metric: "Cost Per Click",
        current: 0.8,
        previous: 0.95,
        change: -15.8,
        trend: "up",
      },
      {
        metric: "Return on Ad Spend",
        current: 2.98,
        previous: 2.45,
        change: 21.6,
        trend: "up",
      },
    ],
  },
  {
    campaign: "Crypto Trading Bot",
    score: 65,
    top_performing_ads: [
      {
        id: "a8",
        title: "AI Trading Bot - 24/7 Profits",
        ctr: 0.067,
        conversion_rate: 0.134,
        impressions: 143000,
        clicks: 9581,
        spend: 11200,
        revenue: 18400,
      },
    ],
    lowest_performing_ads: [
      {
        id: "a9",
        title: "Automated Crypto Strategies",
        ctr: 0.039,
        conversion_rate: 0.087,
        impressions: 112000,
        clicks: 4368,
        spend: 8900,
        revenue: 9800,
      },
    ],
    recommendations: [
      "Emphasize profit potential over technical features",
      "Add risk disclaimers to build trust",
      "Target experienced traders with advanced strategies",
    ],
    advanced_recommendations: [
      "Implement performance-based ad optimization",
      "Use behavioral targeting for risk-appropriate messaging",
      "Deploy multi-touch attribution modeling",
      "Integrate with trading platforms for seamless onboarding",
    ],
    summary:
      "Crypto Trading Bot campaign showing mixed results. Profit-focused messaging outperforming technical explanations, but overall conversion rates below target.",
    feedback: [
      "Users want proof of bot performance",
      "Risk concerns are primary conversion barriers",
      "Demo accounts significantly improve trust",
    ],
    suggestions: [
      "Provide transparent performance history",
      "Offer risk-free trial periods",
      "Create detailed backtesting reports",
      "Add paper trading mode for beginners",
    ],
    improvements: [
      "Implement real-time performance tracking",
      "Add customizable risk management settings",
      "Create comprehensive strategy marketplace",
      "Develop advanced analytics dashboard",
    ],
    audience_feedback: [
      {
        sentiment: "neutral",
        comment: "Interesting concept but need to see real results",
        rating: 3.4,
        demographic: "25-34 Traders",
      },
      {
        sentiment: "negative",
        comment: "Too risky without proper safeguards",
        rating: 2.8,
        demographic: "45-54 Conservative Investors",
      },
      {
        sentiment: "positive",
        comment: "Great for passive income generation",
        rating: 4.2,
        demographic: "35-44 Tech Professionals",
      },
    ],
    causes_and_impact: {
      causes: [
        "Market volatility increased interest in automated trading",
        "Regulatory uncertainty created hesitation",
        "Competitor scandals improved relative trust",
        "Educational content reduced knowledge barriers",
      ],
      impact: [
        "16% increase in trial sign-ups",
        "22% decrease in conversion to paid plans",
        "11% improvement in user engagement",
        "5% increase in average revenue per user",
      ],
    },
    performance_breakdown: [
      {
        metric: "Click-Through Rate",
        current: 5.3,
        previous: 4.9,
        change: 8.2,
        trend: "up",
      },
      {
        metric: "Conversion Rate",
        current: 11.1,
        previous: 13.2,
        change: -15.9,
        trend: "down",
      },
      {
        metric: "Cost Per Click",
        current: 1.17,
        previous: 1.05,
        change: 11.4,
        trend: "down",
      },
      {
        metric: "Return on Ad Spend",
        current: 1.64,
        previous: 1.89,
        change: -13.2,
        trend: "down",
      },
    ],
  },
];
