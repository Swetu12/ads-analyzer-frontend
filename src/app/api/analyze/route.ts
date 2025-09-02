import { mock_ads } from "@/data/mock_ads.ts";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = mock_ads;
    console.log("Loaded mock ads:", data.campaigns.length);

    const analysis = data.campaigns
      .map((campaign) => {
        if (!campaign.ads || campaign.ads.length === 0) return null;

        const top = campaign.ads.reduce(
          (prev, curr) =>
            curr.clicks / Math.max(curr.impressions, 1) >
            prev.clicks / Math.max(prev.impressions, 1)
              ? curr
              : prev,
          campaign.ads[0],
        );
        const low = campaign.ads.reduce(
          (prev, curr) =>
            curr.clicks / Math.max(curr.impressions, 1) <
            prev.clicks / Math.max(prev.impressions, 1)
              ? curr
              : prev,
          campaign.ads[0],
        );

        return {
          campaign: campaign.name,
          top_performing_ads: [
            {
              id: top.id,
              title: top.title,
              ctr: +(top.clicks / Math.max(top.impressions, 1)).toFixed(3),
              conversion_rate: +(
                top.conversions / Math.max(top.clicks, 1)
              ).toFixed(3),
            },
          ],
          lowest_performing_ads: [
            {
              id: low.id,
              title: low.title,
              ctr: +(low.clicks / Math.max(low.impressions, 1)).toFixed(3),
              conversion_rate: +(
                low.conversions / Math.max(low.clicks, 1)
              ).toFixed(3),
            },
          ],
          recommendations: [
            "Increase budget on top-performing ads",
            "Test new creatives for lower-performing ads",
          ],
          summary: `Campaign ${campaign.name} analysis complete.`,
        };
      })
      .filter(Boolean);

    console.log("Returning analysis for", analysis.length, "campaigns");
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to analyze mock data" },
      { status: 500 },
    );
  }
}
