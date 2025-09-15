"use client";

import Header from "@/components/settings/Header.tsx";
import EmailSettings from "@/components/settings/EmailSettings.tsx";
import PasswordSettings from "@/components/settings/PasswordSettings.tsx";
import DangerZoneSettings from "@/components/settings/DangerZoneSettings.tsx";

export default function SettingsPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-[#1B2028] text-[#E5E7EB]">
      <div className="mx-auto max-w-12xl space-y-8">
        {/* Header */}
        <Header />

        <div className="space-y-6">
          <EmailSettings />
          <PasswordSettings />
        </div>
      </div>
    </div>
  );
}
