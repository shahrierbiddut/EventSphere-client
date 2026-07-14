"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Bell, Menu, Search, ChevronRight, Moon, Mail, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { apiRequest } from "@/lib/api";

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
  title?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AdminHeader({ setSidebarOpen, title = "Dashboard", breadcrumbs }: AdminHeaderProps) {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      try {
        const res = await apiRequest("/api/admin/messages/unread-count");
        if (res && typeof (res as any).count === "number") {
          setUnreadCount((res as any).count);
        }
      } catch (error) {
        console.error("Failed to fetch unread message count:", error);
      }
    };
    
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000); // Poll every minute
    return () => clearInterval(interval);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "A";

  return (
    <header className="sticky top-0 z-30 bg-[#0F172A] border-b border-slate-800/80 h-16 flex items-center justify-between px-4 md:px-8 gap-4 shadow-sm">
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl hover:bg-slate-800 text-slate-400 transition-colors"
        >
          <Menu size={20} />
        </button>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-xs md:text-sm min-w-0">
          <Link href="/dashboard/admin" className="text-slate-400 hover:text-indigo-400 font-semibold transition-colors">
            Admin
          </Link>
          {breadcrumbs?.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <ChevronRight size={12} className="text-slate-650" />
              {crumb.href ? (
                <Link href={crumb.href} className="text-slate-400 hover:text-indigo-400 font-medium transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-slate-200 font-bold truncate">{crumb.label}</span>
              )}
            </span>
          ))}
          {!breadcrumbs && (
            <>
              <ChevronRight size={12} className="text-slate-650" />
              <span className="text-slate-200 font-bold truncate">{title}</span>
            </>
          )}
        </div>
      </div>

      {/* Middle: Search Bar (Centered) */}
      <div className="hidden md:flex flex-1 justify-center max-w-lg mx-auto">
        <div className="relative w-full max-w-md">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search events, users, bookings..."
            className="w-full pl-10 pr-16 py-1.5 text-xs bg-slate-900/60 hover:bg-slate-900 focus:bg-slate-950 rounded-xl border border-slate-800 focus:border-indigo-500/50 focus:outline-none transition-all text-slate-300 placeholder:text-slate-500"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none px-1.5 py-0.5 bg-slate-800 border border-slate-700/60 rounded text-[9px] font-bold text-slate-400">
            <span>Ctrl + K</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        {/* Mobile Search Button */}
        <button className="md:hidden p-2 rounded-xl bg-slate-800/40 border border-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
          <Search size={16} />
        </button>

        {/* Theme Toggle (Moon) with glow */}
        <button className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20 shadow-md shadow-indigo-500/10 transition-colors flex items-center justify-center">
          <Moon size={16} className="fill-indigo-400/20" />
        </button>

        {/* Notification Bell (No badge for now) */}
        <button className="relative p-2 rounded-xl bg-slate-800/40 border border-slate-800/60 text-slate-300 hover:bg-slate-850 hover:text-white transition-colors flex items-center justify-center">
          <Bell size={16} />
        </button>

        {/* Messages */}
        <Link href="/dashboard/admin/messages" className="relative p-2 rounded-xl bg-slate-800/40 border border-slate-800/60 text-slate-300 hover:bg-slate-850 hover:text-white transition-colors flex items-center justify-center cursor-pointer">
          <Mail size={16} />
          {unreadCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-indigo-600 text-white text-[8px] font-extrabold h-4 w-4 rounded-full flex items-center justify-center border border-slate-900 shadow-sm shadow-indigo-650/30">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Link>

        {/* Profile Avatar / Info */}
        <div className="flex items-center gap-2.5 pl-2.5 border-l border-slate-800">
          <div className="relative group cursor-pointer flex items-center justify-center">
            {user?.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-700 group-hover:border-indigo-500 transition-colors"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 shadow-md shadow-indigo-500/10 flex items-center justify-center text-white text-xs font-extrabold group-hover:scale-105 transition-transform border border-slate-700">
                {initials}
              </div>
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
          </div>
          
          <div className="hidden lg:block text-left min-w-0">
            <p className="text-xs font-bold text-slate-200 truncate leading-tight">{user?.name || "Admin User"}</p>
            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">{user?.role === "admin" ? "Super Admin" : user?.role || "Admin"}</p>
          </div>
          <ChevronDown size={14} className="hidden lg:block text-slate-500 cursor-pointer hover:text-slate-300 transition-colors" />
        </div>
      </div>
    </header>
  );
}
