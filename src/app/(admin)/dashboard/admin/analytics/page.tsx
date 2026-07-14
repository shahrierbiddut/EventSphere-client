"use client";

import { useEffect, useState } from "react";
import { Download, Calendar as CalendarIcon } from "lucide-react";
import { 
  BookingsOverviewChart, 
  BookingStatusPieChart, 
  UserGrowthChart, 
  CategoryDistributionChart 
} from "@/components/admin/AdminCharts";
import { apiRequest } from "@/lib/api";

interface AnalyticsData {
  userGrowth: { name: string; users: number }[];
  bookingsOverview: { name: string; bookings: number; revenue: number }[];
  categoryDistribution: { name: string; value: number }[];
  bookingStatus: { name: string; value: number }[];
}

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState("6m");

  useEffect(() => {
    setLoading(true);
    // In a real app, dateRange would be passed as a query param
    apiRequest<AnalyticsData>("/api/admin/analytics")
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dateRange]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">Detailed metrics and performance data.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <button 
              onClick={() => setDateRange("30d")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${dateRange === "30d" ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:bg-muted"}`}
            >
              30D
            </button>
            <div className="w-px h-4 bg-gray-200" />
            <button 
              onClick={() => setDateRange("6m")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${dateRange === "6m" ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:bg-muted"}`}
            >
              6M
            </button>
            <div className="w-px h-4 bg-gray-200" />
            <button 
              onClick={() => setDateRange("1y")}
              className={`px-4 py-2 text-sm font-medium transition-colors ${dateRange === "1y" ? "bg-indigo-50 text-indigo-700" : "text-muted-foreground hover:bg-muted"}`}
            >
              1Y
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-foreground text-sm font-medium rounded-xl hover:bg-muted transition-colors shadow-sm">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card rounded-2xl p-6 border border-border shadow-sm animate-pulse h-80" />
          ))}
        </div>
      ) : data ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue & Bookings (Full width on large screens) */}
            <div className="col-span-1 lg:col-span-2 bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-base font-bold text-foreground">Revenue & Bookings Trend</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Monthly performance metrics</p>
              </div>
              <div className="h-[300px]">
                <BookingsOverviewChart data={data.bookingsOverview} />
              </div>
            </div>

            {/* User Growth */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-base font-bold text-foreground">User Growth</h2>
                <p className="text-xs text-muted-foreground mt-0.5">New user registrations per month</p>
              </div>
              <div className="h-[250px]">
                <UserGrowthChart data={data.userGrowth} />
              </div>
            </div>

            {/* Event Categories */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-base font-bold text-foreground">Events by Category</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Distribution of all events</p>
              </div>
              <div className="h-[250px]">
                <CategoryDistributionChart data={data.categoryDistribution} />
              </div>
            </div>

            {/* Booking Status Distribution */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
              <div className="mb-6">
                <h2 className="text-base font-bold text-foreground">Booking Status</h2>
                <p className="text-xs text-muted-foreground mt-0.5">Current state of all bookings</p>
              </div>
              <div className="h-[250px]">
                <BookingStatusPieChart data={data.bookingStatus} />
              </div>
            </div>

            {/* Quick Insights (Placeholder text for visual completeness) */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl shadow-sm p-6 text-white flex flex-col justify-between">
              <div>
                <div className="mb-6">
                  <h2 className="text-base font-bold text-white">AI Insights</h2>
                  <p className="text-xs text-indigo-200 mt-0.5">Automatically generated summary</p>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-indigo-50">Revenue is up <strong>15%</strong> compared to the previous period, largely driven by Music events.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-indigo-50">Cancellation rate has increased to <strong>8%</strong>. Consider reviewing refund policies or sending reminders.</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                    <p className="text-sm text-indigo-50">User acquisition peaks strongly during weekend promotions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-12 text-muted-foreground">Failed to load analytics data.</div>
      )}
    </div>
  );
}
