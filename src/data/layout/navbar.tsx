import {
  FileText,
  Home,
  Inbox,
  Search,
  Settings2,
  Sparkles,
} from "lucide-react";

export function getActionBarDataByRoute(pathname: string) {
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
          label: "Campaign Details",
          icon: Settings2,
          onClick: () => {
            console.log("Campaign Details clicked");
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
            console.log("Create Campaign");
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
