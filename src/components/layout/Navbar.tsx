"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useTheme } from "@/lib/ThemeContext";
import {
  Menu,
  X,
  Search,
  Sun,
  Moon,
  Heart,
  Bell,
  LayoutDashboard,
  CalendarDays,
  User as UserIcon,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    if (!isMounted) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".profile-dropdown-container")) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMounted]);

  // Close mobile menu on route change
  React.useEffect(() => {
    queueMicrotask(() => {
      setIsMobileMenuOpen(false);
      setIsProfileOpen(false);
    });
  }, [pathname]);

  const guestNavLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Events", href: "/explore" },
    { name: "Categories", href: "/categories" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
  ];

  const userNavLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Events", href: "/explore" },
    { name: "Categories", href: "/categories" },
  ];

  const navLinks = user ? userNavLinks : guestNavLinks;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? user
            ? "bg-[#0F172A]/95 backdrop-blur-md shadow-sm border-b border-slate-800 py-3"
            : "bg-background/95 backdrop-blur-md shadow-sm border-b border-border py-3"
          : user
            ? "bg-[#0F172A]/95 backdrop-blur-md py-4"
            : "bg-background/95 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-bold text-lg leading-none">E</span>
          </div>
          <span
            className={`font-heading font-semibold text-xl tracking-tight ${user ? "text-white" : "text-foreground"}`}
          >
            EventSphere
          </span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1.5 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative px-4 py-2 rounded-xl text-[14px] font-medium transition-colors ${
                pathname === link.href
                  ? "text-indigo-600"
                  : user
                    ? "text-slate-300 hover:text-white hover:bg-slate-800"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-indigo-600 rounded-full" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="hidden lg:flex items-center justify-end gap-3 shrink-0">
          {user ? (
            /* Logged-in User Right Actions */
            <>
              {/* Search Bar */}
              <div className="relative mr-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-9 pr-14 py-2 bg-slate-900/50 border border-slate-700 rounded-[14px] text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all w-[240px]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 shadow-sm">
                  Ctrl + K
                </div>
              </div>

              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {/* Favorites */}
              <Link
                href="/dashboard/favorites"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative block"
              >
                <Heart size={20} />
              </Link>

              {/* Notifications */}
              <Link
                href="/dashboard/notifications"
                className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors relative block"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white border-2 border-[#0F172A]">
                  3
                </span>
              </Link>

              {/* User Avatar Dropdown */}
              <div className="relative profile-dropdown-container ml-2">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 p-1 pr-3 rounded-full hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all"
                >
                  <div className="relative">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={user.name}
                        className="h-9 w-9 rounded-full object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                        {initials}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0F172A]" />
                  </div>
                  <span className="text-sm font-medium text-slate-200">
                    Hi, {user.name?.split(" ")[0] || "User"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-[#0F172A] rounded-2xl shadow-xl shadow-slate-900/20 border border-slate-800 overflow-hidden py-2 transform opacity-100 scale-100 transition-all origin-top-right">
                    <div className="px-4 py-3 border-b border-slate-800/80 flex items-center gap-3">
                      {user.photoUrl ? (
                        <img
                          src={user.photoUrl}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover border border-slate-700"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm border border-indigo-500/30">
                          {initials}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          View your profile
                        </p>
                      </div>
                    </div>

                    <div className="px-2 py-2 space-y-0.5">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <CalendarDays size={16} /> My Bookings
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <UserIcon size={16} /> My Profile
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <Settings size={16} /> Settings
                      </Link>
                      <Link
                        href="/faq"
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <HelpCircle size={16} /> Help Center
                      </Link>
                    </div>

                    <div className="px-2 pt-2 border-t border-slate-800/80">
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Guest Right Actions */
            <>
              <button
                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                aria-label="Search events"
              >
                <Search size={20} />
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <div className="w-px h-6 bg-border mx-2" />
              <Link href="/login">
                <Button
                  variant="outline"
                  className="rounded-[14px] px-5 py-2 h-auto text-sm font-semibold"
                >
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="rounded-[14px] px-5 py-2 h-auto text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${user ? "text-slate-300 hover:bg-slate-800" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 right-0 border-b shadow-xl overflow-y-auto max-h-[calc(100vh-80px)] ${user ? "bg-[#0F172A] border-slate-800 shadow-slate-900/50" : "bg-background border-border shadow-black/5"}`}
        >
          <div className="px-6 py-6 space-y-6">
            {user ? (
              /* User Mobile Drawer */
              <>
                <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                  <div className="relative">
                    {user.photoUrl ? (
                      <img
                        src={user.photoUrl}
                        alt={user.name}
                        className="h-12 w-12 rounded-full object-cover border border-slate-700"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg border border-indigo-500/30">
                        {initials}
                      </div>
                    )}
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-[#0F172A]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <div className="flex-1 bg-slate-800/50 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 border border-slate-700/50">
                    <Heart size={20} className="text-slate-400" />
                    <span className="text-xs font-medium text-slate-300">
                      Favorites
                    </span>
                  </div>
                  <div className="flex-1 bg-slate-800/50 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 border border-slate-700/50 relative">
                    <Bell size={20} className="text-slate-400" />
                    <span className="absolute top-3 right-8 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[9px] font-bold text-white border-2 border-[#0F172A]">
                      3
                    </span>
                    <span className="text-xs font-medium text-slate-300">
                      Alerts
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <nav className="space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                    Menu
                  </div>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 rounded-xl text-[15px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="my-4 border-t border-slate-800/50" />
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 px-2">
                    Account
                  </div>

                  <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <LayoutDashboard size={18} className="text-slate-400" />{" "}
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    <Settings size={18} className="text-slate-400" /> Settings
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[15px] font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </nav>
              </>
            ) : (
              /* Guest Mobile Drawer */
              <>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search events..."
                    className="w-full pl-10 pr-4 py-3 bg-background border border-input rounded-xl text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="flex w-full items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                  aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                >
                  <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                <nav className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-3 rounded-xl text-[15px] font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>

                <div className="border-t border-border pt-6 space-y-3">
                  <Link href="/login" className="block w-full">
                    <Button
                      variant="outline"
                      className="w-full rounded-xl py-6 text-base font-semibold"
                    >
                      Login
                    </Button>
                  </Link>
                  <Link href="/register" className="block w-full">
                    <Button className="w-full rounded-xl py-6 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20">
                      Register
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
