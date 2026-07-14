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
      case "/dashboard": return "Overview";
      case "/dashboard/bookings": return "My Bookings";
      case "/dashboard/favorites": return "Favorite Events";
      case "/dashboard/profile": return "My Profile";
      case "/dashboard/notifications": return "Notifications";
      case "/dashboard/settings": return "Settings";
      default: return "Dashboard";
    }
  };

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-4 md:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900 rounded-lg hover:bg-gray-100"
        >
          <Menu className="h-5 w-5" />
        </button>
        
        <div className="hidden sm:flex items-center text-sm font-medium text-gray-500">
          <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
          {pathname !== "/dashboard" && (
            <>
              <ChevronRight className="h-4 w-4 mx-1 text-gray-300" />
              <span className="text-gray-900">{getPageTitle()}</span>
            </>
          )}
        </div>
        <h1 className="sm:hidden font-bold text-gray-900">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search dashboard..." 
            className="pl-9 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20 w-64 transition-all focus:bg-white"
          />
        </div>

        <Link href="/dashboard/notifications" className="relative p-2 text-gray-500 hover:text-primary transition-colors rounded-full hover:bg-gray-50">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Link>

        <Link href="/dashboard/profile" className="block">
          <img 
            src={user.photoUrl || user.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)} 
            alt={user.name} 
            className="h-8 w-8 rounded-full border-2 border-white shadow-sm object-cover hover:border-primary/50 transition-colors"
          />
        </Link>
      </div>
    </header>
  );
}
