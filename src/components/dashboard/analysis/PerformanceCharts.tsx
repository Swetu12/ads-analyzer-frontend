"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Campaign } from "../data/mockData";
import { Card } from "@/components/ui/card";
import { BarChart3, TrendingUp } from "lucide-react";

interface PerformanceChartsProps {
  campaign: Campaign;
}

export function PerformanceCharts({ campaign }: PerformanceChartsProps) {
  const allAds = [
    ...campaign.top_performing_ads,
    ...campaign.lowest_performing_ads,
  ];

  const chartData = allAds.map((ad, index) => ({
    name: ad.title.split(" ").slice(0, 2).join(" "),
    ctr: ad.ctr * 100,
    conversion: ad.conversion_rate * 100,
    roas: ad.revenue / ad.spend,
    fullTitle: ad.title,
  }));

  const performanceData = campaign.performance_breakdown.map((item) => ({
    metric: item.metric.split(" ").slice(0, 2).join(" "),
    current: item.current,
    previous: item.previous,
    fullMetric: item.metric,
  }));

  return (
    <div className="space-y-6">
      <Card className="bg-[#1a1b1e] border-gray-800">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">
              Ad Performance Metrics
            </h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="name"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                  tickFormatter={(value) => `${value.toFixed(1)}%`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1b1e",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number, name) => [
                    `${value.toFixed(2)}%`,
                    name === "ctr" ? "CTR" : "Conversion Rate",
                  ]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.fullTitle;
                    }
                    return label;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="ctr"
                  stroke="#10B981"
                  fill="#10B98120"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="conversion"
                  stroke="#3B82F6"
                  fill="#3B82F620"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      <Card className="bg-[#1a1b1e] border-gray-800 h-[335px]">
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              Performance Comparison
            </h3>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis
                  dataKey="metric"
                  stroke="#9CA3AF"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1a1b1e",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  formatter={(value: number, name) => [
                    value.toFixed(2),
                    name === "current" ? "Current Period" : "Previous Period",
                  ]}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.fullMetric;
                    }
                    return label;
                  }}
                />
                <Bar dataKey="previous" fill="#6B7280" radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
}
