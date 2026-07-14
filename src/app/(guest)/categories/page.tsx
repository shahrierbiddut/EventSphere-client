"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Laptop,
  Briefcase,
  Music,
  Trophy,
  GraduationCap,
  Palette,
  Coffee,
  Star,
  Heart,
  Gamepad2,
  Tag,
  ArrowRight,
  Search,
} from "lucide-react";
import { apiRequest } from "@/lib/api";
import { categories as fallbackCategories } from "@/data/categories";
import { Category } from "@/types";

const iconMap: Record<string, React.ElementType> = {
  Users,
  BookOpen,
  Laptop,
  Briefcase,
  Music,
  Trophy,
  GraduationCap,
  Palette,
  Coffee,
  Star,
  Heart,
  Gamepad2,
  Tag,
};

const colorPalette = [
  { bg: "from-indigo-500/20 to-indigo-600/10", border: "border-indigo-500/20", icon: "text-indigo-400", badge: "bg-indigo-500/10 text-indigo-400" },
  { bg: "from-sky-500/20 to-sky-600/10", border: "border-sky-500/20", icon: "text-sky-400", badge: "bg-sky-500/10 text-sky-400" },
  { bg: "from-violet-500/20 to-violet-600/10", border: "border-violet-500/20", icon: "text-violet-400", badge: "bg-violet-500/10 text-violet-400" },
  { bg: "from-amber-500/20 to-amber-600/10", border: "border-amber-500/20", icon: "text-amber-400", badge: "bg-amber-500/10 text-amber-400" },
  { bg: "from-emerald-500/20 to-emerald-600/10", border: "border-emerald-500/20", icon: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400" },
  { bg: "from-rose-500/20 to-rose-600/10", border: "border-rose-500/20", icon: "text-rose-400", badge: "bg-rose-500/10 text-rose-400" },
  { bg: "from-cyan-500/20 to-cyan-600/10", border: "border-cyan-500/20", icon: "text-cyan-400", badge: "bg-cyan-500/10 text-cyan-400" },
  { bg: "from-fuchsia-500/20 to-fuchsia-600/10", border: "border-fuchsia-500/20", icon: "text-fuchsia-400", badge: "bg-fuchsia-500/10 text-fuchsia-400" },
  { bg: "from-orange-500/20 to-orange-600/10", border: "border-orange-500/20", icon: "text-orange-400", badge: "bg-orange-500/10 text-orange-400" },
  { bg: "from-teal-500/20 to-teal-600/10", border: "border-teal-500/20", icon: "text-teal-400", badge: "bg-teal-500/10 text-teal-400" },
  { bg: "from-lime-500/20 to-lime-600/10", border: "border-lime-500/20", icon: "text-lime-400", badge: "bg-lime-500/10 text-lime-400" },
  { bg: "from-pink-500/20 to-pink-600/10", border: "border-pink-500/20", icon: "text-pink-400", badge: "bg-pink-500/10 text-pink-400" },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    apiRequest<Category[]>("/api/categories")
      .then((data) => {
        if (data && data.length > 0) setCategories(data);
      })
      .catch(() => {/* use fallback */})
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#080C14]">
      {/* Hero */}
      <div className="relative overflow-hidden pt-28 pb-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-sky-900/10 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-6 uppercase tracking-wider">
            <Tag size={12} /> Browse by Category
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Explore Event{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-sky-400 bg-clip-text text-transparent">
              Categories
            </span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
            Find events that match your interests. From tech conferences to music festivals — there's something for everyone.
          </p>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-900/60 border border-slate-700 rounded-2xl text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-40 rounded-2xl bg-slate-800/40 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Tag size={48} className="mx-auto text-slate-700 mb-4" />
            <p className="text-slate-400 text-lg">No categories match "{search}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((cat, index) => {
              const Icon = iconMap[cat.iconName] || Tag;
              const color = colorPalette[index % colorPalette.length];
              return (
                <Link
                  key={cat.id || cat._id || cat.slug}
                  href={`/explore?category=${encodeURIComponent(cat.name)}`}
                  className={`group relative flex flex-col items-start p-6 rounded-2xl bg-gradient-to-br ${color.bg} border ${color.border} hover:border-opacity-50 hover:scale-[1.03] transition-all duration-200 cursor-pointer overflow-hidden`}
                >
                  {/* Glow orb */}
                  <div className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20 ${color.icon}`} />

                  <div className={`w-12 h-12 rounded-xl bg-slate-900/50 flex items-center justify-center mb-4 ${color.icon} group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                  </div>

                  <h3 className="font-bold text-slate-100 text-base mb-1 leading-snug">
                    {cat.name}
                  </h3>

                  {cat.eventCount !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${color.badge}`}>
                      {cat.eventCount} events
                    </span>
                  )}

                  <div className={`mt-4 flex items-center gap-1 text-xs font-semibold ${color.icon} opacity-0 group-hover:opacity-100 transition-opacity`}>
                    Browse <ArrowRight size={12} />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-500 text-sm mb-4">Can't find what you're looking for?</p>
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-colors"
          >
            Browse All Events <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
