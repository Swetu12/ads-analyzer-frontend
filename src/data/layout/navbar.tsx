"use client";

import {
  AudioWaveform,
  Calendar,
  ChartPie,
  Command,
  Download,
  FileUp,
  Gauge,
  Home,
  Inbox,
  LogOutIcon,
  Pencil,
  Settings2,
  Sparkles,
} from "lucide-react";
import { useCampaignStore } from "@/lib/stores/analysis/CampaignStore.ts";
import { useCampaignFilesStore } from "@/lib/stores/analysis/CampaignFilesStore.ts";
import { handleExportPDF } from "../../../supabase/functions/campaigns/action.tsx";
import { signOutUser } from "../../../supabase/functions/auth/actions.ts";
import { usePathname } from "next/navigation";

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
          icon: Download,
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
          icon: FileUp,
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
          icon: Pencil,
          onClick: () => {
            setIsCampaignModalOpen(true);
          },
        },
      ],
    ];
  }
}

export function useNavLinks() {
  const pathname = usePathname();

  return {
    teams: [
      { name: "Acme Inc", logo: Command, plan: "Enterprise" },
      { name: "Acme Corp.", logo: AudioWaveform, plan: "Startup" },
      { name: "Evil Corp.", logo: Command, plan: "Free" },
    ],
    navSecondary: [
      { title: "Settings", url: "/settings", icon: Settings2 },
      {
        title: "Log Out",
        url: "",
        icon: LogOutIcon,
        onClick: async (e: React.MouseEvent) => {
          e.preventDefault();
          await signOutUser();
          window.location.reload();
        },
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: Gauge,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Analysis",
        url: "/dashboard/analysis",
        icon: ChartPie,
        isActive:
          pathname.startsWith("/dashboard/analysis") ||
          pathname.startsWith("/dashboard/campaigns"),
      },
    ],
  };
}
