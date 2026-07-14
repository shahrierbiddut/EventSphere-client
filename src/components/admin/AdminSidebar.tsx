"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BarChart2,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
  Star,
  Tag,
  Ticket,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";

const navItems = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/events", label: "Events", icon: BookOpen },
  { href: "/dashboard/admin/categories", label: "Categories", icon: Tag },
  { href: "/dashboard/admin/bookings", label: "Bookings", icon: Ticket },
  { href: "/dashboard/admin/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/admin/messages", label: "Messages", icon: Mail },
  { href: "/dashboard/admin/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];

interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "AD";

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen z-50 flex flex-col
          bg-[#0F172A] border-r border-slate-800 text-slate-200 transition-all duration-300
          ${collapsed ? "w-[76px]" : "w-64"}
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo/Brand Section */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800/80 flex-shrink-0">
          {!collapsed ? (
            <Link href="/" className="flex items-center gap-3 min-w-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform flex-shrink-0">
                E
              </div>
              <div className="min-w-0">
                <p className="font-extrabold text-sm text-white tracking-tight leading-tight group-hover:text-indigo-400 transition-colors">EventSphere</p>
                <p className="text-[10px] text-indigo-400/90 font-bold uppercase tracking-wider">Admin Control</p>
              </div>
            </Link>
          ) : (
            <Link href="/" className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/25 mx-auto hover:scale-105 transition-transform">
              E
            </Link>
          )}

          {/* Close on mobile */}
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 scrollbar-thin">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive =
              href === "/dashboard/admin"
                ? pathname === href
                : pathname.startsWith(href);

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative
                  ${isActive
                    ? "bg-indigo-600/15 text-indigo-400 font-semibold border-l-2 border-indigo-500"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 border-l-2 border-transparent"
                  }
                `}
              >
                <Icon size={18} className={`flex-shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-indigo-400" : "text-slate-400"}`} />
                {!collapsed && (
                  <span className="text-sm">{label}</span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl border border-slate-800 transition-opacity">
                    {label}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout Section */}
        <div className="border-t border-slate-800/80 p-3 space-y-2">
          {/* User Profile Info */}
          {!collapsed ? (
            <div className="flex items-center gap-3 px-2 py-2 bg-slate-800/20 border border-slate-800/40 rounded-xl">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500/30 to-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-xs flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-slate-200 truncate leading-tight">{user?.name || "Admin User"}</p>
                <p className="text-[10px] text-rose-400/80 truncate mt-0.5">{user?.email || "admin@eventsphere.com"}</p>
              </div>
            </div>
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500/30 to-rose-600/20 border border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-xs mx-auto">
              {initials}
            </div>
          )}

          {/* View Website Button */}
          <Link
            href="/"
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sky-400 bg-sky-500/5 hover:bg-sky-500/15 border border-sky-500/10 hover:border-sky-500/25 transition-all group relative ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <Globe size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm font-semibold">View Website</span>}
            {collapsed && (
              <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl border border-slate-800 transition-opacity">
                View Website
              </div>
            )}
          </Link>

          {/* Logout Button */}
          <button
            onClick={() => logout()}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-400 bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/10 hover:border-rose-500/25 transition-all group relative ${
              collapsed ? "justify-center" : ""
            }`}
          >
            <LogOut size={18} className="flex-shrink-0" />
            {!collapsed && <span className="text-sm font-semibold">Logout</span>}
            {collapsed && (
              <div className="absolute left-full ml-3 px-2 py-1 bg-slate-950 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 shadow-2xl border border-slate-800 transition-opacity">
                Logout
              </div>
            )}
          </button>

          {/* Collapse Trigger */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex w-full items-center justify-center p-2 rounded-xl text-slate-500 hover:bg-slate-800/40 hover:text-slate-300 transition-all border border-transparent hover:border-slate-850"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </aside>
    </>
  );
}
