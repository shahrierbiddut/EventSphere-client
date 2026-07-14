"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface AdminStatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: "indigo" | "sky" | "emerald" | "amber" | "rose";
  trend?: { value: number; label: string };
  prefix?: string;
  suffix?: string;
}

const colorMap = {
  indigo: {
    bg: "bg-indigo-50/40",
    iconBg: "bg-indigo-100/60",
    icon: "text-indigo-600",
    border: "border-indigo-100",
    valueColor: "text-indigo-900",
    glow: "shadow-indigo-500/5",
    gradient: "from-indigo-500/10 to-transparent",
  },
  sky: {
    bg: "bg-sky-50/40",
    iconBg: "bg-sky-100/60",
    icon: "text-sky-600",
    border: "border-sky-100",
    valueColor: "text-sky-900",
    glow: "shadow-sky-500/5",
    gradient: "from-sky-500/10 to-transparent",
  },
  emerald: {
    bg: "bg-emerald-50/40",
    iconBg: "bg-emerald-100/60",
    icon: "text-emerald-600",
    border: "border-emerald-100",
    valueColor: "text-emerald-900",
    glow: "shadow-emerald-500/5",
    gradient: "from-emerald-500/10 to-transparent",
  },
  amber: {
    bg: "bg-amber-50/40",
    iconBg: "bg-amber-100/60",
    icon: "text-amber-600",
    border: "border-amber-100",
    valueColor: "text-amber-900",
    glow: "shadow-amber-500/5",
    gradient: "from-amber-500/10 to-transparent",
  },
  rose: {
    bg: "bg-rose-50/40",
    iconBg: "bg-rose-100/60",
    icon: "text-rose-600",
    border: "border-rose-100",
    valueColor: "text-rose-900",
    glow: "shadow-rose-500/5",
    gradient: "from-rose-500/10 to-transparent",
  },
};

export function AdminStatsCard({
  title,
  value,
  icon: Icon,
  color,
  trend,
  prefix = "",
  suffix = "",
}: AdminStatsCardProps) {
  const colors = colorMap[color];
  const isPositive = trend && trend.value >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden bg-white/90 border ${colors.border} rounded-2xl p-6 shadow-sm ${colors.glow} hover:shadow-xl hover:border-slate-300/80 transition-all duration-300 group`}
    >
      {/* Decorative subtle gradient glow background */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${colors.gradient} rounded-bl-full pointer-events-none opacity-60`} />

      <div className="flex items-start justify-between relative z-10">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">{title}</p>
          <h3 className={`text-3xl font-extrabold ${colors.valueColor} tracking-tight leading-none`}>
            {prefix}{typeof value === "number" ? value.toLocaleString() : value}{suffix}
          </h3>
          
          {trend && (
            <div className={`flex items-center gap-1 mt-3 text-xs font-bold ${isPositive ? "text-emerald-600" : "text-rose-500"}`}>
              <div className={`flex items-center justify-center p-0.5 rounded-full ${isPositive ? "bg-emerald-50" : "bg-rose-50"}`}>
                {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              </div>
              <span>{isPositive ? "+" : ""}{trend.value}%</span>
              <span className="text-slate-400 font-medium"> {trend.label}</span>
            </div>
          )}
        </div>
        
        <div className={`${colors.iconBg} p-3.5 rounded-2xl group-hover:rotate-6 group-hover:scale-110 transition-all duration-300 flex items-center justify-center`}>
          <Icon size={20} className={colors.icon} />
        </div>
      </div>
    </motion.div>
  );
}
