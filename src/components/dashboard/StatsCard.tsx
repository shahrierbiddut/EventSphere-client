import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  colorClass: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  colorClass,
}: StatsCardProps) {
  const getToneClasses = (tone: string) => {
    if (tone.includes("emerald")) {
      return {
        accent: "border-t-emerald-400",
        icon: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
        value: "text-emerald-100",
        hover: "hover:border-emerald-500/35 hover:shadow-emerald-500/15",
        trendUp:
          "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30",
        trendDown: "bg-rose-500/15 text-rose-200 border border-rose-500/30",
      };
    }
    if (tone.includes("rose")) {
      return {
        accent: "border-t-rose-400",
        icon: "bg-rose-500/10 text-rose-300 border border-rose-500/20",
        value: "text-rose-100",
        hover: "hover:border-rose-500/35 hover:shadow-rose-500/15",
        trendUp:
          "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30",
        trendDown: "bg-rose-500/15 text-rose-200 border border-rose-500/30",
      };
    }
    if (tone.includes("pink")) {
      return {
        accent: "border-t-pink-400",
        icon: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
        value: "text-pink-100",
        hover: "hover:border-pink-500/35 hover:shadow-pink-500/15",
        trendUp:
          "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30",
        trendDown: "bg-rose-500/15 text-rose-200 border border-rose-500/30",
      };
    }
    return {
      accent: "border-t-indigo-400",
      icon: "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",
      value: "text-indigo-100",
      hover: "hover:border-indigo-500/35 hover:shadow-indigo-500/15",
      trendUp:
        "bg-emerald-500/15 text-emerald-200 border border-emerald-500/30",
      trendDown: "bg-rose-500/15 text-rose-200 border border-rose-500/30",
    };
  };

  const tone = getToneClasses(colorClass);

  return (
    <div
      className={cn(
        "rounded-2xl p-6 border border-slate-800/80 border-t-2 bg-[#0F172A] shadow-lg shadow-black/20 transition-all duration-300 ease-out hover:-translate-y-1",
        tone.accent,
        tone.hover,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div
          className={cn(
            "p-3 rounded-xl transition-transform duration-300",
            tone.icon,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider",
              trendUp ? tone.trendUp : tone.trendDown,
            )}
          >
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-slate-300 font-bold text-[10px] uppercase tracking-[0.12em]">
          {title}
        </h3>
        <p
          className={cn(
            "text-3xl font-extrabold font-heading tracking-tight",
            tone.value,
          )}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
