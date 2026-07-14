import Link from "next/link";
import {
  ArrowRight,
  CircleCheck,
  Users,
  CalendarDays,
  MapPin,
  TrendingUp,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/events/EventCard";
import { Input } from "@/components/ui/Input";
import { categories } from "@/data/categories";
import { events as fallbackEvents } from "@/data/events";
import { getEvents, getCategories } from "@/lib/api";
import { Event } from "@/types";

export default async function HomePage() {
  let events = fallbackEvents;
  let pageCategories = categories;

  try {
    events = await getEvents<Event[]>();
  } catch {
    events = fallbackEvents;
  }

  try {
    pageCategories = await getCategories();
  } catch {
    pageCategories = categories;
  }

  const featuredEvents = events.filter((event) => event.isFeatured).slice(0, 6);

  return (
    <div className="flex flex-col w-full">
      <section className="relative w-full min-h-[85vh] flex items-center pt-24 pb-20 overflow-hidden text-white">
        {/* Background Image and Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop"
            alt="Event crowds"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-indigo-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-6">
          <div className="max-w-3xl space-y-8 animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-indigo-200">
              🎉 Welcome to the ultimate Event Hub
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading leading-tight tracking-tight">
              Discover & Experience <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                Amazing Events
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              EventSphere is your global platform to find, create, and manage
              events. From high-energy music festivals to global tech summits,
              we bring communities together.
            </p>

            {/* Glassmorphism Search Bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-2.5 rounded-2xl flex flex-col sm:flex-row gap-2.5 max-w-2xl shadow-2xl">
              <div className="flex-1 relative flex items-center">
                <Search className="absolute left-3 text-white/50 h-5 w-5" />
                <Input
                  placeholder="Search for events..."
                  className="pl-10 border-0 focus-visible:ring-0 text-white bg-transparent placeholder:text-white/50 text-base"
                />
              </div>
              <div className="hidden sm:block w-px bg-white/20 my-2" />
              <div className="flex-1 relative flex items-center">
                <MapPin className="absolute left-3 text-white/50 h-5 w-5" />
                <Input
                  placeholder="Location"
                  className="pl-10 border-0 focus-visible:ring-0 text-white bg-transparent placeholder:text-white/50 text-base"
                />
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-lg shadow-indigo-500/30"
                asChild
              >
                <Link href="/explore">Search</Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm text-gray-300 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-medium text-white">Popular:</span>
                {[
                  { label: "Technology", query: "Technology" },
                  { label: "Music Festival", query: "Music" },
                  { label: "Workshops", query: "Workshop" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={`/explore?category=${encodeURIComponent(item.query)}`}
                    className="rounded-full border border-white/20 px-3.5 py-1 text-xs text-gray-200 hover:bg-white/10 hover:border-white/40 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="hidden sm:block h-4 w-px bg-white/20" />

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-gray-200 font-medium">
                    1,200+ Live Events
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                  <span className="text-xs text-gray-200 font-medium">
                    50K+ Users
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-bold font-heading mb-2">
                Featured Events
              </h2>
              <p className="text-muted-foreground">
                Hand-picked events you do not want to miss.
              </p>
            </div>
            <Button variant="outline" className="group rounded-full" asChild>
              <Link href="/explore">
                Explore All{" "}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold font-heading mb-2">
            Browse by Category
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover events that match your interests across various categories.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {(
              [
                {
                  name: "Technology",
                  emoji: "💻",
                  color: "from-blue-500 to-cyan-500",
                  count: 245,
                },
                {
                  name: "Music",
                  emoji: "🎵",
                  color: "from-purple-500 to-pink-500",
                  count: 318,
                },
                {
                  name: "Business",
                  emoji: "💼",
                  color: "from-amber-500 to-orange-500",
                  count: 152,
                },
                {
                  name: "Sports",
                  emoji: "🏃",
                  color: "from-green-500 to-emerald-500",
                  count: 110,
                },
                {
                  name: "Food",
                  emoji: "🍽️",
                  color: "from-red-500 to-rose-500",
                  count: 204,
                },
                {
                  name: "Art",
                  emoji: "🎨",
                  color: "from-violet-500 to-purple-500",
                  count: 174,
                },
                {
                  name: "Education",
                  emoji: "📚",
                  color: "from-sky-500 to-blue-500",
                  count: 95,
                },
                {
                  name: "Entertainment",
                  emoji: "🎭",
                  color: "from-fuchsia-500 to-pink-500",
                  count: 88,
                },
                {
                  name: "Health & Wellness",
                  emoji: "🌿",
                  color: "from-teal-500 to-green-500",
                  count: 67,
                },
                {
                  name: "Gaming",
                  emoji: "🎮",
                  color: "from-indigo-500 to-violet-500",
                  count: 43,
                },
                {
                  name: "Conference",
                  emoji: "🏛️",
                  color: "from-slate-500 to-gray-600",
                  count: 124,
                },
                {
                  name: "Workshop",
                  emoji: "🔧",
                  color: "from-yellow-500 to-amber-500",
                  count: 86,
                },
              ] as const
            ).map((cat) => (
              <Link
                key={cat.name}
                href={`/explore?category=${encodeURIComponent(cat.name)}`}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 overflow-hidden relative"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {cat.emoji}
                </div>
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors leading-tight text-center">
                  {cat.name}
                </h3>
                <span className="text-xs text-muted-foreground mt-1 font-medium">
                  {cat.count}+ events
                </span>
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold font-heading">
                Why Choose EventSphere?
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide a seamless experience for both event attendees and
                organizers. From discovery to ticketing, everything is handled
                in one premium platform.
              </p>
              <div className="space-y-4 pt-4">
                {[
                  "Discover events tailored to your interests",
                  "Secure and fast ticket booking process",
                  "Manage all your tickets in one digital wallet",
                  "Receive updates and reminders instantly",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <CircleCheck className="h-6 w-6 text-success shrink-0" />
                    <span className="text-foreground font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Users, label: "Active Users", value: "10K+" },
                { icon: CalendarDays, label: "Events Hosted", value: "5K+" },
                { icon: MapPin, label: "Cities Covered", value: "50+" },
                { icon: TrendingUp, label: "Tickets Sold", value: "250K+" },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="bg-card p-6 rounded-2xl shadow-sm border border-border flex flex-col items-center text-center gap-3"
                >
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-xl">{value}</h3>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-28 overflow-hidden bg-linear-to-br from-slate-950 via-indigo-950 to-violet-900 text-white text-center">
        <div className="absolute inset-0 opacity-[0.08] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute -top-28 -left-20 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-14 h-96 w-96 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-indigo-200 mb-8">
            🚀 Get Started Today — It's Free
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight">
            Your next great event
            <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-200 via-indigo-200 to-fuchsia-200">
              starts right here.
            </span>
          </h2>
          <p className="text-xl text-indigo-100/85 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join over 50,000 event enthusiasts and organizers who trust
            EventSphere to discover amazing events and host their own.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="rounded-full px-10 h-14 text-base bg-card text-indigo-700 hover:bg-indigo-50 shadow-2xl shadow-black/30 font-bold"
              asChild
            >
              <Link href="/register">Create Free Account</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-10 h-14 text-base bg-white/10! border-white/55 text-white hover:bg-white/20! hover:text-white backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
              asChild
            >
              <Link href="/explore" className="inline-flex items-center gap-2">
                Browse Events
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-indigo-100/85">
            {[
              "Secure checkout",
              "Instant e-tickets",
              "Verified organizers",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 backdrop-blur-md"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-8 text-sm text-indigo-200">
            {[
              { val: "50K+", label: "Active Users" },
              { val: "5K+", label: "Events Hosted" },
              { val: "250K+", label: "Tickets Sold" },
              { val: "50+", label: "Cities Worldwide" },
            ].map(({ val, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white mb-1">{val}</p>
                <p className="text-sm text-indigo-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
