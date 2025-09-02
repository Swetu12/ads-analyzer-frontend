import {
  FileText,
  Home,
  Inbox,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useCampaignStore } from "@/lib/stores/analysis/CampaignStore.ts";
import { useCampaignFilesStore } from "@/lib/stores/analysis/CampaignFilesStore.ts";

export function getActionBarDataByRoute(pathname: string) {
  const { setIsCampaignModalOpen } = useCampaignStore();
  const { setIsOpen } = useCampaignFilesStore();

  if (pathname === "/dashboard") {
    return [
      [
        {
          label: "Dashboard Campaign",
          icon: Settings2,
          onClick: () => {
            console.log("Dashboard Campaign clicked");
          },
        },
      ],
    ];
  } else if (
    pathname.startsWith("/dashboard/campaigns/") &&
    pathname !== "/campaigns"
  ) {
    return [
      [
        {
          label: "Upload File",
          icon: Settings2,
          onClick: () => {
            setIsOpen(true);
          },
        },
      ],
    ];
  } else {
    return [
      [
        {
          label: "Create Campaign",
          icon: Settings2,
          onClick: () => {
            setIsCampaignModalOpen(true);
          },
        },
      ],
    ];
  }
}

export const navLinks = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Sparkles,
    },
    {
      title: "Analysis",
      url: "/dashboard/analysis",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
};
