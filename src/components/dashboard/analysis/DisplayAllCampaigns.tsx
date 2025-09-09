import { Card } from "@/components/ui/card";
import { useCampaignGlobalStore } from "@/lib/stores/global/CampaignGlobalStore";
import Link from "next/link";

export default function DisplayAllCampaigns() {
  const { campaigns } = useCampaignGlobalStore();

  return (
    <div className="space-y-6 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {campaigns.map((campaign) => (
          <Link href={`/dashboard/campaigns/${campaign.id}`} key={campaign.id}>
            <Card className="p-6 h-48 analysis-card-background-color border-slate-700/50 hover:bg-slate-800/95 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl hover:shadow-blue-500/10">
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-lg text-slate-100 text-pretty group-hover:text-blue-300 transition-colors leading-tight">
                      {campaign.name}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className="w-3 h-3 bg-blue-500/60 rounded-full group-hover:bg-blue-400 transition-colors shadow-sm"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-slate-300 text-balance leading-relaxed line-clamp-2">
                      <span className="text-blue-400 font-medium">Goal:</span>{" "}
                      {campaign.goal}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {/* Date range with enhanced styling */}
                  <div className="text-xs text-slate-400 font-medium bg-slate-800/50 rounded-md px-3 py-2 border border-slate-700/30">
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
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400">Click to analyze</span>
                    <div className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors">
                      <span>View Details</span>
                      <svg
                        className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
