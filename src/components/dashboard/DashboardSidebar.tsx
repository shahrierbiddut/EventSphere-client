"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Ticket, 
  Heart, 
  UserCircle, 
  Bell, 
  Settings, 
  LogOut,
  X
} from "lucide-react";
import { useAuth } from "@/lib/AuthContext";
import { UserProfile } from "@/types";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  user: UserProfile;
}

export function DashboardSidebar({ isOpen, setIsOpen, user }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "My Bookings", href: "/dashboard/bookings", icon: Ticket },
    { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { name: "Profile", href: "/dashboard/profile", icon: UserCircle },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-[#0F172A] border-r border-slate-800/80 w-64 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"} flex flex-col`}>
        
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-md shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
              <span className="text-white font-black text-xl leading-none">E</span>
            </div>
            <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
              EventSphere
            </span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 hover:text-slate-200">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {links.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 relative overflow-hidden ${
                  isActive 
                    ? "bg-primary/10 text-primary pl-5" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-primary rounded-r-md" />
                )}
                <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-primary" : "text-slate-500"}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/30">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-800/80 bg-[#0F172A] shadow-sm mb-3">
            <img 
              src={user.photoUrl || user.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name)} 
              alt={user.name} 
              className="h-9 w-9 rounded-full border border-slate-700 object-cover"
            />
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs font-bold text-slate-200 truncate leading-none mb-1">{user.name}</span>
              <span className="text-[10px] text-slate-500 truncate leading-none">{user.email}</span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs text-rose-400 bg-rose-500/5 hover:bg-rose-500/15 border border-rose-500/10 hover:border-rose-500/25 rounded-xl font-bold transition-all duration-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
