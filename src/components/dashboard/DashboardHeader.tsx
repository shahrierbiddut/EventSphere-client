"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Bell, ChevronRight } from "lucide-react";
import { UserProfile } from "@/types";

interface HeaderProps {
  user: UserProfile;
  setSidebarOpen: (isOpen: boolean) => void;
}

export function DashboardHeader({ user, setSidebarOpen }: HeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Overview";
      case "/dashboard/bookings":
        return "My Bookings";
      case "/dashboard/favorites":
        return "Favorite Events";
      case "/dashboard/profile":
        return "My Profile";
      case "/dashboard/notifications":
        return "Notifications";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <header className="h-16 bg-[#0F172A]/90 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between px-4 md:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-slate-800"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center text-sm font-medium text-slate-400">
          <Link
            href="/dashboard"
            className="hover:text-indigo-300 transition-colors"
          >
            Dashboard
          </Link>
          {pathname !== "/dashboard" && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-slate-600" />
              <span className="text-slate-100">{getPageTitle()}</span>
            </>
          )}
        </div>
        <h1 className="sm:hidden font-bold text-slate-100">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search dashboard..."
            className="pl-9 pr-4 py-2 bg-slate-800/90 border border-slate-700 rounded-full text-sm text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/40 w-64 transition-all"
          />
        </div>

        <Link
          href="/dashboard/notifications"
          className="relative p-2 text-slate-400 hover:text-indigo-300 transition-colors rounded-full hover:bg-slate-800"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#0F172A]" />
        </Link>

        <Link href="/dashboard/profile" className="block">
          <img
            src={
              user.photoUrl ||
              user.avatarUrl ||
              "https://ui-avatars.com/api/?name=" +
                encodeURIComponent(user.name)
            }
            alt={user.name}
            className="h-8 w-8 rounded-full border-2 border-white shadow-sm object-cover hover:border-primary/50 transition-colors"
          />
        </Link>
      </div>
    </header>
  );
}
