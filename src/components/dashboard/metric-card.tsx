import { TrendingDown, TrendingUp } from "lucide-react";
import React from "react";

export const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  change,
  color = "#3B82F6",
  subtitle,
}: {
  title: string;
  value: string;
  icon: any;
  trend?: "up" | "down";
  change?: number;
  color?: string;
  subtitle?: string;
}) => (
  <div className=" border border-[#2C3E50] rounded-xl p-6 transition-all duration-300">
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 rounded-lg" style={{ backgroundColor: color + "20" }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      {trend && change && (
        <div
          className={`flex items-center space-x-1 ${trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"}`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="text-xs font-medium">{change.toFixed(1)}%</span>
        </div>
      )}
    </div>
    <div className="mb-1">
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-[#9CA3AF] text-sm">{title}</div>
      {subtitle && (
        <div className="text-[#6B7280] text-xs mt-1">{subtitle}</div>
      )}
    </div>
  </div>
);
