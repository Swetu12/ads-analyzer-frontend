import React from "react";

export const ChartCard = ({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`bg-[#1B2028] border border-[#2C3E50] rounded-xl p-6 ${className}`}
  >
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {subtitle && <p className="text-[#9CA3AF] text-sm">{subtitle}</p>}
    </div>
    {children}
  </div>
);
