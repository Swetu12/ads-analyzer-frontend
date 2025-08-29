import { Card } from "@/components/ui/card";
import { useCampaignGlobalStore } from "@/lib/stores/global/CampaignGlobalStore.ts";
import Link from "next/link";

export default function DisplayAllCampaigns() {
  const { campaigns } = useCampaignGlobalStore();

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <Link href={`/dashboard/campaigns/${campaign.id}`} key={campaign.id}>
            <Card className="p-4 bg-card/50 border-border/50 hover:bg-card hover:border-border transition-all duration-200 cursor-pointer group">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-card-foreground text-pretty truncate group-hover:text-foreground transition-colors">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-balance leading-relaxed mt-1 line-clamp-2">
                    Goal: {campaign.goal}
                  </p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="text-xs text-muted-foreground font-medium">
                    {campaign.start_date && campaign.end_date
                      ? `${new Date(campaign.start_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )} - ${new Date(campaign.end_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}`
                      : "No date set"}
                  </p>

                  <div className="w-2 h-2 bg-accent/60 rounded-full mt-2 ml-auto group-hover:bg-accent transition-colors"></div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
