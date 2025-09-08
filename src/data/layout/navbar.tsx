import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  FileText,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useCampaignStore } from "@/lib/stores/analysis/CampaignStore.ts";
import { useCampaignFilesStore } from "@/lib/stores/analysis/CampaignFilesStore.ts";
import { handleExportPDF } from "../../../supabase/functions/campaigns/action.tsx";

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
  } else if (/^\/dashboard\/campaigns\/[^/]+\/dashboard$/.test(pathname)) {
    return [
      [
        {
          label: "Export Analysis",
          icon: Home,
          onClick: handleExportPDF,
        },
      ],
    ];
  } else if (
    pathname.startsWith("/dashboard/campaigns/") &&
    pathname !== "/dashboard/campaigns"
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
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
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
