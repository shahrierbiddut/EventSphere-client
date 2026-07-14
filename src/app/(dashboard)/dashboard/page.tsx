"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { apiRequest } from "@/lib/api";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BookingCard } from "@/components/dashboard/BookingCard";
import { Booking, Event } from "@/types";
import {
  Ticket,
  CalendarCheck,
  Heart,
  Sparkles,
  PlusCircle,
  ArrowUpRight,
  ShieldCheck,
  Compass,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function DashboardHome() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [bookingsData, favoritesData] = await Promise.all([
          apiRequest<Booking[]>("/api/bookings"),
          apiRequest<Event[]>("/api/users/me/favorites"),
        ]);
        setBookings(bookingsData);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-gray-200 rounded-2xl w-full max-w-md"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  const upcomingBookings = bookings.filter((b) => b.status === "confirmed");
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-linear-to-br from-[#121B35] via-[#1F1D57] to-[#31135D] rounded-3xl p-6 md:p-8 text-white shadow-2xl shadow-indigo-900/20 border border-indigo-500/20">
        <div className="absolute -top-20 -left-10 h-48 w-48 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden md:block">
          <svg
            className="h-full w-full object-cover"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d="M0,0 C30,40 70,60 100,100 L100,0 Z"
              fill="url(#grid-grad)"
            />
            <defs>
              <linearGradient
                id="grid-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/30 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-black/20">
            <ShieldCheck className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300">Gold Member</span>
            <span className="text-white/60 text-[10px]">
              • ID: GM-{user?.id?.slice(-6) || "000000"}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black tracking-tight mb-2 leading-tight">
            Welcome back, {user?.name?.split(" ")[0]}! 👋
          </h1>
          <p className="text-indigo-100/90 text-sm md:text-base font-medium max-w-xl">
            Manage your booked experiences, view favorite picks, or publish a
            new event effortlessly.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-2">
            {[
              {
                label: "⚡ Express Check-in",
                color: "from-amber-500/20 to-amber-600/20 border-amber-400/40",
              },
              {
                label: "🎯 Priority Support",
                color: "from-rose-500/20 to-rose-600/20 border-rose-400/40",
              },
              {
                label: "🔔 Smart Reminders",
                color: "from-cyan-500/20 to-cyan-600/20 border-cyan-400/40",
              },
            ].map((item) => (
              <span
                key={item.label}
                className={`rounded-full border bg-gradient-to-r ${item.color} px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/95 backdrop-blur-sm`}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Bookings"
          value={bookings.length}
          icon={Ticket}
          colorClass="indigo"
        />
        <StatsCard
          title="Confirmed Bookings"
          value={upcomingBookings.length}
          icon={CalendarCheck}
          colorClass="emerald"
        />
        <StatsCard
          title="Cancelled Bookings"
          value={cancelledBookings.length}
          icon={Ticket}
          colorClass="rose"
        />
        <StatsCard
          title="Saved Favorites"
          value={favorites.length}
          icon={Heart}
          colorClass="pink"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black font-heading text-slate-100 tracking-tight">
              Recent Bookings
            </h2>
            <Link
              href="/dashboard/bookings"
              className="text-indigo-400 text-xs font-bold hover:underline uppercase tracking-wider"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings
                .slice(0, 3)
                .map((booking) => (
                  <BookingCard
                    key={booking._id || booking.id}
                    booking={booking}
                  />
                ))
            ) : (
              <div className="bg-slate-900/55 rounded-3xl border border-dashed border-slate-700 p-8 text-center flex flex-col items-center justify-center min-h-75 shadow-xl shadow-black/20">
                <div className="w-14 h-14 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/25 shadow-lg shadow-indigo-500/10">
                  <Ticket className="h-6 w-6 text-indigo-300" />
                </div>
                <h3 className="text-base font-bold text-slate-200 mb-1">
                  No event bookings yet
                </h3>
                <p className="text-slate-400 mb-5 text-xs max-w-xs leading-relaxed">
                  You haven't booked tickets for any upcoming events. Explore
                  our diverse categories to get started.
                </p>
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-200 mb-4">
                  <ShieldCheck className="h-3.5 w-3.5" /> Trusted & Secure
                  Booking
                </div>
                <Button
                  asChild
                  className="rounded-xl h-10 px-5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-sm shadow-indigo-600/20"
                >
                  <Link href="/explore">Explore Events</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions & Recommendations */}
        <div className="space-y-6">
          {/* Create Event Banner */}
          <div className="relative overflow-hidden bg-linear-to-br from-indigo-500 via-violet-600 to-fuchsia-700 rounded-3xl p-6 text-white shadow-2xl shadow-indigo-900/30 group border border-indigo-300/20">
            <div className="absolute -right-6 -bottom-8 w-28 h-28 bg-white/15 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />
            <div className="absolute -left-10 top-0 w-20 h-20 bg-cyan-300/20 rounded-full blur-2xl" />
            <h3 className="text-lg font-black font-heading tracking-tight mb-2">
              Create Your Own Event
            </h3>
            <p className="text-white/85 text-xs mb-5 leading-relaxed">
              Want to publish an event? Submit an event for admin approval and
              launch your experiences.
            </p>
            <Button
              asChild
              variant="outline"
              className="w-full bg-card text-indigo-600 border-none hover:bg-muted rounded-xl h-10 text-xs font-bold shadow-sm cursor-pointer"
            >
              <Link href="/dashboard/create-event">
                <PlusCircle className="h-4 w-4 mr-2" /> Create Event
              </Link>
            </Button>
          </div>

          {/* Featured Recommendation Card */}
          <div className="bg-[#0F172A] rounded-3xl border border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="h-40 relative overflow-hidden bg-slate-800">
              <img
                src="/comedy.jpg"
                alt="Standup Comedy Night"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] to-transparent" />
              <span className="absolute top-3 left-3 bg-indigo-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                Trending
              </span>
              <div className="absolute bottom-3 left-4 text-white">
                <span className="text-[9px] font-bold opacity-80 uppercase tracking-widest leading-none block mb-0.5 text-indigo-300">
                  Entertainment
                </span>
                <h4 className="font-bold font-heading text-sm leading-tight text-slate-100">
                  Standup Comedy Night
                </h4>
              </div>
            </div>
            <div className="p-5">
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">
                Get ready for a night of non-stop laughter with top local and
                guest standup comedians in Banani, Dhaka.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-indigo-400 font-black text-sm">$25</span>
                <Button
                  size="sm"
                  asChild
                  className="rounded-xl h-9 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  <Link
                    href="/events/standup-comedy-night"
                    className="flex items-center gap-1"
                  >
                    Book Ticket <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-[#0F172A] rounded-3xl border border-slate-800 p-6 shadow-sm">
            <h3 className="text-sm font-black font-heading text-slate-200 uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <div className="space-y-1.5">
              <Link
                href="/explore"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors group text-xs font-semibold text-slate-400 hover:text-slate-200 border border-transparent hover:border-indigo-500/40"
              >
                <span className="inline-flex items-center gap-2">
                  <Compass className="h-4 w-4 text-indigo-400" /> Browse Events
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </Link>
              <Link
                href="/dashboard/favorites"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors group text-xs font-semibold text-slate-400 hover:text-slate-200 border border-transparent hover:border-pink-500/40"
              >
                <span className="inline-flex items-center gap-2">
                  <Heart className="h-4 w-4 text-pink-400" /> View Favorites
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </Link>
              <Link
                href="/dashboard/profile"
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/80 transition-colors group text-xs font-semibold text-slate-400 hover:text-slate-200 border border-transparent hover:border-cyan-500/40"
              >
                <span className="inline-flex items-center gap-2">
                  <UserCircle className="h-4 w-4 text-cyan-400" /> Update
                  Profile
                </span>
                <span className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
