"use client";

import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  MousePointer,
  DollarSign,
  Target,
  Star,
  Eye,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  campaignDistributionData,
  monthlyPerformanceData,
  overallDashboard,
  revenueOverTimeData,
  weeklyActivityData,
} from "@/data/mock_ads_response.ts";
import { ChartCard } from "@/components/dashboard/chart-card.tsx";
import { MetricCard } from "@/components/dashboard/metric-card.tsx";

const formatNumber = (num: number) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
};

const formatCurrency = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
};

const formatPercentage = (num: number) => {
  return (num * 100).toFixed(1) + "%";
};

export default function Dashboard() {
  return (
    <div className="min-h-screen text-white p-6">
      <div className="max-w-12xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-[#9CA3AF]">
            Monitor your advertising performance and insights
          </p>
        </div>

        {/* Top Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={formatCurrency(overallDashboard.total_revenue)}
            icon={DollarSign}
            trend="up"
            change={24.4}
            color="#10B981"
            subtitle="this year"
          />
          <MetricCard
            title="Average ROAS"
            value={overallDashboard.average_roas.toFixed(2) + "x"}
            icon={Target}
            trend="up"
            change={18.2}
            color="#3B82F6"
            subtitle="this year"
          />
          <MetricCard
            title="Click-Through Rate"
            value={formatPercentage(overallDashboard.average_ctr)}
            icon={MousePointer}
            trend="up"
            change={30.8}
            color="#8B5CF6"
            subtitle="this year"
          />
          <MetricCard
            title="Conversion Rate"
            value={formatPercentage(overallDashboard.average_conversion_rate)}
            icon={Zap}
            trend="up"
            change={27.3}
            color="#FACC15"
            subtitle="this year"
          />
        </div>

        {/* Second Row Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Impressions"
            value={formatNumber(overallDashboard.total_impressions)}
            icon={Eye}
            trend="up"
            change={12.5}
            color="#2C82A8"
            subtitle="this year"
          />
          <MetricCard
            title="Total Clicks"
            value={formatNumber(overallDashboard.total_clicks)}
            icon={Users}
            trend="up"
            change={15.8}
            color="#059669"
            subtitle="this year"
          />
          <MetricCard
            title="Cost Per Click"
            value={formatCurrency(overallDashboard.average_cpc)}
            icon={DollarSign}
            trend="down"
            change={8.3}
            color="#EF4444"
            subtitle="this year"
          />
          <MetricCard
            title="Campaign Score"
            value={overallDashboard.average_score + "/100"}
            icon={Star}
            trend="up"
            change={5.2}
            color="#9333EA"
            subtitle="this year"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Over Time */}
          <ChartCard
            title="Revenue Over Time"
            subtitle="this year"
            className="lg:col-span-1"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueOverTimeData}>
                  <defs>
                    <linearGradient
                      id="revenueGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1B2028",
                      border: "1px solid #2C3E50",
                      borderRadius: "8px",
                      color: "#E5E7EB",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Campaign Distribution */}
          <ChartCard title="Campaign Distribution" subtitle="this year">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={campaignDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {campaignDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1B2028",
                      border: "1px solid #2C3E50",
                      borderRadius: "8px",
                      color: "#E5E7EB",
                    }}
                  />
                  <Legend wrapperStyle={{ color: "#E5E7EB" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Monthly Performance and Weekly Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Monthly Performance */}
          <ChartCard
            title="Monthly Performance"
            subtitle="this year"
            className="lg:col-span-2"
          >
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1B2028",
                      border: "1px solid #2C3E50",
                      borderRadius: "8px",
                      color: "#E5E7EB",
                    }}
                  />
                  <Bar
                    dataKey="impressions"
                    fill="#3B82F6"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar dataKey="clicks" fill="#10B981" radius={[4, 4, 0, 0]} />
                  <Bar
                    dataKey="conversions"
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>

          {/* Weekly Activity */}
          <ChartCard title="Weekly Activity" subtitle="this year">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1B2028",
                      border: "1px solid #2C3E50",
                      borderRadius: "8px",
                      color: "#E5E7EB",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="activity"
                    stroke="#FACC15"
                    strokeWidth={3}
                    dot={{ fill: "#FACC15", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: "#FACC15" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </ChartCard>
        </div>

        {/* Recommendations and Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Strategic Recommendations */}
          <ChartCard
            title="Strategic Recommendations"
            subtitle="AI-powered insights"
          >
            <div className="space-y-4">
              {overallDashboard.aggregated_recommendations
                .slice(0, 4)
                .map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-[#16212B] border border-[#374151] rounded-lg hover:bg-[#2C3E50] transition-colors"
                  >
                    <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-[#E5E7EB] text-sm">{recommendation}</p>
                  </div>
                ))}
            </div>
          </ChartCard>

          {/* Performance Insights */}
          <ChartCard
            title="Performance Insights"
            subtitle="Key metrics analysis"
          >
            <div className="space-y-4">
              {overallDashboard.performance_breakdown_summary.map(
                (item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-[#16212B] border border-[#374151] rounded-lg"
                  >
                    <div>
                      <span className="text-white text-sm font-medium">
                        {item.metric}
                      </span>
                      <div className="text-[#9CA3AF] text-xs">
                        Average: {item.average}%
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-4 h-4 text-[#10B981]" />
                      <span className="text-[#10B981] text-sm font-medium">
                        Trending
                      </span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </ChartCard>
        </div>
      </div>
    </div>
  );
}
