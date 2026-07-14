"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#38BDF8", "#EC4899"];

interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

// Custom Glassmorphic Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="backdrop-blur-md bg-slate-900/95 border border-slate-800 text-white rounded-xl shadow-2xl p-4 min-w-[150px] animate-in fade-in zoom-in-95 duration-200">
        <p className="text-xs font-semibold text-slate-400 mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color || item.fill }} />
                {item.name}
              </span>
              <span className="font-bold text-white">
                {item.name === "Revenue" || item.name === "Revenue ($)" ? `$${Number(item.value).toLocaleString()}` : Number(item.value).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// ==========================================
// BookingsOverviewChart
// ==========================================
export function BookingsOverviewChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10B981" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
          </linearGradient>
          <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#6366F1" floodOpacity="0.15" />
          </filter>
          <filter id="shadowRevenue" x="-5%" y="-5%" width="110%" height="110%">
            <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#10B981" floodOpacity="0.15" />
          </filter>
        </defs>
        <CartesianGrid strokeDasharray="6 6" stroke="#E2E8F0" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#64748B", fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          dy={10}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#64748B", fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          height={36}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ fontSize: 12, fontWeight: 500, color: "#475569" }}
        />
        <Area
          type="monotone"
          dataKey="bookings"
          stroke="#6366F1"
          fill="url(#colorBookings)"
          strokeWidth={3}
          filter="url(#shadow)"
          dot={{ fill: "#6366F1", r: 4, strokeWidth: 2, stroke: "#FFFFFF" }}
          activeDot={{ fill: "#6366F1", r: 6, strokeWidth: 2, stroke: "#FFFFFF" }}
          name="Bookings"
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#10B981"
          fill="url(#colorRevenue)"
          strokeWidth={3}
          filter="url(#shadowRevenue)"
          dot={{ fill: "#10B981", r: 4, strokeWidth: 2, stroke: "#FFFFFF" }}
          activeDot={{ fill: "#10B981", r: 6, strokeWidth: 2, stroke: "#FFFFFF" }}
          name="Revenue ($)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ==========================================
// BookingStatusPieChart
// ==========================================
export function BookingStatusPieChart({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="relative w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={95}
            paddingAngle={4}
            dataKey="value"
            cornerRadius={6}
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.8)" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 11, fontWeight: 500, color: "#475569" }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Absolute overlay for total bookings in center */}
      <div className="absolute top-[43%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
        <p className="text-2xl font-extrabold text-slate-800 tracking-tight">{total}</p>
        <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Total Bookings</p>
      </div>
    </div>
  );
}

// ==========================================
// UserGrowthChart
// ==========================================
export function UserGrowthChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.3} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="6 6" stroke="#E2E8F0" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: "#64748B", fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          dy={10}
        />
        <YAxis
          tick={{ fontSize: 11, fill: "#64748B", fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          dx={-10}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="users" fill="url(#colorUsers)" radius={[6, 6, 0, 0]} name="New Users" maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ==========================================
// CategoryDistributionChart
// ==========================================
export function CategoryDistributionChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical" margin={{ top: 0, right: 10, left: 30, bottom: 0 }}>
        <defs>
          <linearGradient id="colorCategory" x1="0" y1="0" x2="1" y2="0">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.9} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.4} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="6 6" stroke="#E2E8F0" horizontal={false} />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "#64748B", fontWeight: 500 }}
          axisLine={false}
          tickLine={false}
          dy={5}
        />
        <YAxis
          dataKey="name"
          type="category"
          tick={{ fontSize: 11, fill: "#475569", fontWeight: 600 }}
          axisLine={false}
          tickLine={false}
          width={80}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="url(#colorCategory)" radius={[0, 6, 6, 0]} name="Events" maxBarSize={20}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
