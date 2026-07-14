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

export function StatsCard({ title, value, icon: Icon, trend, trendUp, colorClass }: StatsCardProps) {
  // Extract base colors for custom subtle gradient glows
  const getGlowStyles = (colors: string) => {
    if (colors.includes("blue")) return "shadow-blue-500/[0.03] hover:shadow-blue-500/[0.08] hover:border-blue-200/80";
    if (colors.includes("primary") || colors.includes("indigo")) return "shadow-primary/5 hover:shadow-primary/10 hover:border-primary/30";
    if (colors.includes("emerald")) return "shadow-emerald-500/[0.03] hover:shadow-emerald-500/[0.08] hover:border-emerald-200/80";
    if (colors.includes("rose")) return "shadow-rose-500/[0.03] hover:shadow-rose-500/[0.08] hover:border-rose-200/80";
    return "shadow-gray-500/[0.03] hover:shadow-gray-500/[0.08] hover:border-gray-200";
  };

  const glowStyle = getGlowStyles(colorClass);

  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 border border-gray-100 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl",
      glowStyle
    )}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
          colorClass
        )}>
          <Icon className="h-5 w-5" />
        </div>
        {trend && (
          <span className={cn(
            "text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider",
            trendUp ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-rose-50 text-rose-700 border border-rose-100"
          )}>
            {trendUp ? "↑" : "↓"} {trend}
          </span>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider">{title}</h3>
        <p className="text-3xl font-extrabold font-heading text-gray-900 tracking-tight">{value}</p>
      </div>
    </div>
  );
}
