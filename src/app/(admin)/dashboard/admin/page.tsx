"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  BarChart2,
  BookOpen,
  DollarSign,
  Ticket,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { AdminStatsCard } from "@/components/admin/AdminStatsCard";
import { AdminBadge, AdminSkeletonRow } from "@/components/admin/AdminUI";
import {
  BookingsOverviewChart,
  BookingStatusPieChart,
} from "@/components/admin/AdminCharts";
import { apiRequest } from "@/lib/api";

interface AdminStats {
  totalUsers: number;
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  recentBookings: {
    _id: string;
    ticketCode?: string;
    status: string;
    totalPrice: number;
    user: { name: string; email: string; photoUrl?: string };
    event: { title: string };
    createdAt: string;
  }[];
  recentUsers: {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
  }[];
}

interface AnalyticsData {
  bookingsOverview: { name: string; bookings: number; revenue: number }[];
  bookingStatus: { name: string; value: number }[];
  categoryDistribution: { name: string; value: number }[];
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      apiRequest<AdminStats>("/api/admin/stats"),
      apiRequest<AnalyticsData>("/api/admin/analytics"),
    ])
      .then(([s, a]) => {
        setStats(s);
        setAnalytics(a);
        setError(null);
      })
      .catch((err) => {
        console.error("Admin fetch error:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load admin dashboard";
        setError(errorMessage);
      })
      .finally(() => setLoading(false));
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Error Banner */}
      {error && (
        <motion.div
          variants={itemVariants}
          className="bg-red-500/10 border border-red-500/30 rounded-2xl p-4 text-red-200"
        >
          <div className="flex items-start gap-3">
            <div className="text-xl">⚠️</div>
            <div>
              <h3 className="font-bold text-red-100 mb-1">
                Error Loading Dashboard
              </h3>
              <p className="text-sm text-red-200/80">{error}</p>
              <p className="text-xs text-red-200/60 mt-2">
                Make sure you are logged in as an admin user. Contact support if
                the issue persists.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Welcome Banner */}
      <motion.div
        variants={itemVariants}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-8 text-white shadow-xl shadow-indigo-950/15 border border-indigo-900/30"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-200 mb-3 backdrop-blur-md">
              ⚡ Platform Overview
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm text-indigo-200/80 font-medium mt-2 max-w-xl">
              Welcome back to your command center. Monitor user growth, event
              capacities, revenue aggregates, and platform statistics in real
              time.
            </p>
          </div>
          <div className="flex-shrink-0">
            <div className="px-5 py-3.5 bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl flex flex-col items-center md:items-end">
              <span className="text-[10px] text-indigo-300 font-extrabold uppercase tracking-widest">
                Local Server Time
              </span>
              <span className="text-lg font-black tracking-tight mt-1 text-white">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
      >
        <AdminStatsCard
          title="Total Users"
          value={loading ? "—" : (stats?.totalUsers ?? 0)}
          icon={Users}
          color="indigo"
          trend={{ value: 12, label: "vs last month" }}
        />
        <AdminStatsCard
          title="Total Events"
          value={loading ? "—" : (stats?.totalEvents ?? 0)}
          icon={BookOpen}
          color="sky"
          trend={{ value: 8, label: "vs last month" }}
        />
        <AdminStatsCard
          title="Total Bookings"
          value={loading ? "—" : (stats?.totalBookings ?? 0)}
          icon={Ticket}
          color="emerald"
          trend={{ value: 23, label: "vs last month" }}
        />
        <AdminStatsCard
          title="Total Revenue"
          value={loading ? "—" : (stats?.totalRevenue ?? 0)}
          icon={DollarSign}
          color="amber"
          trend={{ value: 15, label: "vs last month" }}
          prefix="$"
        />
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 xl:grid-cols-3 gap-8"
      >
        {/* Bookings Overview Chart */}
        <div className="xl:col-span-2 bg-card rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                Bookings & Revenue Overview
              </h2>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                Aggregate performance over the past six months
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 rounded-xl p-1 text-xs border border-slate-100">
              <span className="px-3 py-1 bg-card rounded-lg font-bold text-slate-700 shadow-sm border border-slate-100">
                6 Months
              </span>
            </div>
          </div>
          <div className="w-full">
            {analytics ? (
              <BookingsOverviewChart data={analytics.bookingsOverview} />
            ) : (
              <div className="h-64 bg-slate-50 rounded-2xl animate-pulse" />
            )}
          </div>
        </div>

        {/* Booking Status Pie Chart */}
        <div className="bg-card rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 md:p-8 flex flex-col justify-between">
          <div className="border-b border-slate-50 pb-4 mb-6">
            <h2 className="text-lg font-bold text-slate-800 tracking-tight">
              Booking Status
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Summary of ticket states
            </p>
          </div>
          <div className="w-full flex items-center justify-center">
            {analytics && analytics.bookingStatus.length > 0 ? (
              <BookingStatusPieChart data={analytics.bookingStatus} />
            ) : (
              <div className="h-64 bg-slate-50 rounded-2xl animate-pulse w-full" />
            )}
          </div>
        </div>
      </motion.div>

      {/* Bottom Grid: Tables */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 xl:grid-cols-2 gap-8"
      >
        {/* Recent Bookings Table */}
        <div className="bg-card rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/40">
            <div>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Recent Booking Transactions
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Real-time payment logs
              </p>
            </div>
            <a
              href="/dashboard/admin/bookings"
              className="inline-flex items-center gap-1 text-xs text-indigo-600 font-bold hover:text-indigo-700 group transition-colors"
            >
              View sales ledger{" "}
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-semibold text-xs bg-slate-50/20">
                  <th className="px-6 py-3.5">User</th>
                  <th className="px-6 py-3.5">Event</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading
                  ? Array.from({ length: 4 }).map((_, i) => (
                      <AdminSkeletonRow key={i} cols={4} />
                    ))
                  : stats?.recentBookings.map((booking) => (
                      <tr
                        key={booking._id}
                        className="hover:bg-slate-50/40 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-800 text-xs">
                            {booking.user.name}
                          </p>
                          <p className="text-slate-400 text-[10px] font-medium">
                            {booking.user.email}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-slate-600 max-w-[150px] truncate">
                          {booking.event.title}
                        </td>
                        <td className="px-6 py-4">
                          <AdminBadge variant={booking.status} />
                        </td>
                        <td className="px-6 py-4 text-right text-xs font-bold text-slate-800">
                          ${booking.totalPrice.toLocaleString()}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Users List */}
        <div className="bg-card rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/40">
            <div>
              <h2 className="text-base font-bold text-slate-800 tracking-tight">
                Latest Registrants
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                New member notifications
              </p>
            </div>
            <a
              href="/dashboard/admin/users"
              className="inline-flex items-center gap-1 text-xs text-indigo-600 font-bold hover:text-indigo-700 group transition-colors"
            >
              Manage accounts{" "}
              <ArrowUpRight
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>
          <div className="divide-y divide-slate-50 flex-1">
            {loading ? (
              <div className="p-6 space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 animate-pulse"
                  >
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 bg-slate-100 rounded w-1/3" />
                      <div className="h-3 bg-slate-100 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              stats?.recentUsers.map((user) => {
                const initials = user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);
                return (
                  <div
                    key={user._id}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-slate-50/40 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100/50 border border-indigo-100/30 flex items-center justify-center text-indigo-600 font-bold text-xs flex-shrink-0">
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold truncate">
                        {user.email}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <AdminBadge variant={user.role} />
                      <p className="text-[10px] text-slate-400 font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
