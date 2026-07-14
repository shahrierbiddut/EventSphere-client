"use client";

import * as React from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
  Calendar as CalendarIcon,
  Grid,
  List as ListIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Flame,
  Tag,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { EventCard } from "@/components/events/EventCard";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { categories as fallbackCategories } from "@/data/categories";
import { events as fallbackEvents } from "@/data/events";
import { apiRequest, getCategories } from "@/lib/api";
import { Event } from "@/types";

const ITEMS_PER_PAGE = 6;

const categoryIcons: Record<string, string> = {
  Technology: "💻",
  Business: "💼",
  Music: "🎵",
  Education: "📚",
  Art: "🎨",
  Food: "🍽️",
  Sports: "🏃",
  Entertainment: "🎭",
  "Health & Wellness": "🌿",
  Gaming: "🎮",
  Conference: "🏛️",
  Workshop: "🔧",
};

function ExploreEventsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const pageParam = searchParams.get("page");

  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null,
  );
  const [priceFilter, setPriceFilter] = React.useState<"all" | "free" | "paid">(
    "all",
  );
  const [sortBy, setSortBy] = React.useState("newest");
  const [events, setEvents] = React.useState<Event[]>(fallbackEvents);
  const [categories, setCategories] = React.useState(fallbackCategories);
  const [isLoading, setIsLoading] = React.useState(true);

  const initialPage = pageParam ? parseInt(pageParam, 10) || 1 : 1;
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  // Load categories from server
  React.useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await getCategories();
        if (data && Array.isArray(data) && data.length > 0) {
          setCategories(data);
        }
      } catch {
        // Keep fallback categories
      }
    };
    loadCategories();
  }, []);

  // Sync category state when query parameters change
  React.useEffect(() => {
    if (categoryParam) {
      let mapped = categoryParam;
      const normalized = categoryParam.toLowerCase().trim();
      if (normalized === "music festival") {
        mapped = "Music";
      } else if (normalized === "workshops" || normalized === "workshop") {
        mapped = "Workshop";
      } else {
        // Find match in categories list case-insensitively
        const match = categories.find(
          (c) => c.name.toLowerCase() === normalized,
        );
        if (match) mapped = match.name;
      }
      setSelectedCategory(mapped);
    } else {
      setSelectedCategory(null);
    }
  }, [categoryParam, categories]);

  React.useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await apiRequest<Event[]>("/api/events");
        setEvents(data.length > 0 ? data : fallbackEvents);
      } catch {
        setEvents(fallbackEvents);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, []);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
    const params = new URLSearchParams(searchParams.toString());
    if (params.has("page")) {
      params.delete("page");
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [searchQuery, selectedCategory, priceFilter, sortBy]);

  const filteredEvents = React.useMemo(() => {
    let result = events.filter((event) => {
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? event.category === selectedCategory
        : true;
      const matchesPrice =
        priceFilter === "free"
          ? event.isFree
          : priceFilter === "paid"
            ? !event.isFree
            : true;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    // Sort
    if (sortBy === "price_asc")
      result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === "price_desc")
      result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === "rating")
      result = [...result].sort((a, b) => b.rating - a.rating);
    else
      result = [...result].sort(
        (a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0),
      );

    return result;
  }, [events, searchQuery, selectedCategory, priceFilter, sortBy]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE);
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.replace(`?${params.toString()}`, { scroll: false });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceFilter("all");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchQuery || selectedCategory || priceFilter !== "all";

  return (
    <div className="min-h-screen bg-muted">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-semibold uppercase tracking-wider text-indigo-200 mb-6">
            <Flame className="w-3.5 h-3.5 text-orange-300" />
            {filteredEvents.length} Events Available
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Explore All Events
          </h1>
          <p className="text-lg text-indigo-100/80 max-w-2xl mx-auto">
            Discover the best events happening around you. Filter by category,
            date, location, and price.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sticky top-20 space-y-6">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-5 w-5 text-primary" />
                <h2 className="font-bold text-lg">Filters</h2>
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Event name, location..."
                    className="pl-9 bg-muted border-border focus:bg-card"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="City or area"
                    className="pl-9 bg-muted border-border focus:bg-card"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">
                  Date
                </label>
                <div className="relative">
                  <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="date"
                    className="pl-9 bg-muted border-border focus:bg-card"
                  />
                </div>
              </div>

              <div className="h-px bg-muted" />

              {/* Price Filter */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Tag className="h-4 w-4 text-primary" /> Price
                </label>
                <div className="flex flex-col gap-2">
                  {[
                    { value: "all", label: "All Events" },
                    { value: "free", label: "🎁 Free Events" },
                    { value: "paid", label: "🎟️ Paid Events" },
                  ].map(({ value, label }) => (
                    <label
                      key={value}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="price"
                        value={value}
                        checked={priceFilter === value}
                        onChange={() =>
                          setPriceFilter(value as "all" | "free" | "paid")
                        }
                        className="text-primary focus:ring-primary"
                      />
                      <span
                        className={`text-sm transition-colors ${priceFilter === value ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"}`}
                      >
                        {label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="h-px bg-muted" />

              {/* Categories */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-foreground">
                  Categories
                </label>
                <div className="flex flex-col gap-1">
                  <button
                    className={`text-left text-sm px-3 py-2.5 rounded-xl transition-all flex items-center gap-2 ${!selectedCategory ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold" : "hover:bg-muted text-muted-foreground border border-transparent hover:border-border"}`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    <span>🌐</span> All Categories
                    <span
                      className={`ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium ${!selectedCategory ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
                    >
                      {events.length}
                    </span>
                  </button>
                  {categories.map((cat) => {
                    const count = events.filter(
                      (e) => e.category === cat.name,
                    ).length;
                    if (count === 0) return null;
                    return (
                      <button
                        key={cat.id}
                        className={`text-left text-sm px-3 py-2.5 rounded-xl transition-all flex items-center gap-2 ${selectedCategory === cat.name ? "bg-primary text-white shadow-md shadow-primary/20 font-semibold" : "hover:bg-muted text-muted-foreground border border-transparent hover:border-border"}`}
                        onClick={() => setSelectedCategory(cat.name)}
                      >
                        <span>{categoryIcons[cat.name] || "📌"}</span>
                        {cat.name}
                        <span
                          className={`ml-auto text-xs px-1.5 py-0.5 rounded-full font-medium ${selectedCategory === cat.name ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"}`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-sm">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {hasActiveFilters ? (
                    <>
                      Showing{" "}
                      <span className="text-primary font-bold">
                        {filteredEvents.length}
                      </span>{" "}
                      results
                    </>
                  ) : (
                    <>
                      <span className="text-primary font-bold">
                        {filteredEvents.length}
                      </span>{" "}
                      events available
                    </>
                  )}
                </p>
                {hasActiveFilters && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Page {currentPage} of {totalPages || 1}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  className="text-sm border border-border rounded-xl py-2 pl-3 pr-8 w-full sm:w-auto bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">⭐ Featured First</option>
                  <option value="rating">🏆 Highest Rated</option>
                  <option value="price_asc">💰 Price: Low to High</option>
                  <option value="price_desc">💸 Price: High to Low</option>
                </select>

                <div className="flex items-center border border-border rounded-xl overflow-hidden shrink-0 bg-card">
                  <button
                    className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
                    onClick={() => setViewMode("grid")}
                    aria-label="Grid View"
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-primary/10 text-primary" : "hover:bg-muted text-muted-foreground"}`}
                    onClick={() => setViewMode("list")}
                    aria-label="List View"
                  >
                    <ListIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2">
                {selectedCategory && (
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full border border-primary/20">
                    {categoryIcons[selectedCategory] || "📌"} {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="hover:text-primary/60"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {priceFilter !== "all" && (
                  <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-200">
                    {priceFilter === "free" ? "🎁 Free" : "🎟️ Paid"}
                    <button
                      onClick={() => setPriceFilter("all")}
                      className="hover:text-green-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {searchQuery && (
                  <span className="inline-flex items-center gap-1.5 bg-muted text-foreground text-xs font-semibold px-3 py-1.5 rounded-full border border-border">
                    🔍 "{searchQuery}"
                    <button
                      onClick={() => setSearchQuery("")}
                      className="hover:text-muted-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Event Results */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-card rounded-2xl border border-border overflow-hidden animate-pulse"
                  >
                    <div className="h-48 bg-gray-200" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedEvents.length > 0 ? (
              <div
                className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"}`}
              >
                {paginatedEvents.map((event) => (
                  <EventCard key={event.id || event.slug} event={event} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center border-2 border-dashed border-border rounded-2xl bg-card">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-3xl mb-5">
                  🔍
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  No events found
                </h3>
                <p className="text-muted-foreground max-w-sm mb-6">
                  We couldn't find events matching your filters. Try adjusting
                  your search.
                </p>
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-full px-6"
                >
                  Clear all filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div className="flex justify-center pt-4">
                <div className="flex items-center gap-2 bg-card border border-border rounded-2xl shadow-sm px-4 py-3">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => {
                        const isCurrentPage = page === currentPage;
                        const showPage =
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1;
                        const showEllipsisBefore =
                          page === currentPage - 2 && page > 2;
                        const showEllipsisAfter =
                          page === currentPage + 2 && page < totalPages - 1;

                        if (
                          !showPage &&
                          !showEllipsisBefore &&
                          !showEllipsisAfter
                        )
                          return null;
                        if (showEllipsisBefore || showEllipsisAfter) {
                          return (
                            <span
                              key={`ellipsis-${page}`}
                              className="px-2 text-muted-foreground text-sm"
                            >
                              ...
                            </span>
                          );
                        }

                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                              isCurrentPage
                                ? "bg-primary text-white shadow-md shadow-primary/30"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      },
                    )}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Page info */}
            {!isLoading && totalPages > 1 && (
              <p className="text-center text-xs text-muted-foreground">
                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredEvents.length)}{" "}
                of {filteredEvents.length} events
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExploreEventsPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-muted flex items-center justify-center py-24">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-muted-foreground font-medium">
              Loading events explore page...
            </p>
          </div>
        </div>
      }
    >
      <ExploreEventsContent />
    </React.Suspense>
  );
}
