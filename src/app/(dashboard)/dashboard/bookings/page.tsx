"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { Booking } from "@/types";
import { BookingCard } from "@/components/dashboard/BookingCard";
import { Ticket } from "lucide-react";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "confirmed" | "cancelled">("all");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await apiRequest<Booking[]>("/api/bookings");
      setBookings(data);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;
    
    setCancellingId(bookingId);
    try {
      await apiRequest(`/api/bookings/${bookingId}`, {
        method: "DELETE",
      });
      // Refresh bookings
      await fetchBookings();
    } catch (error: any) {
      alert(error.message || "Failed to cancel booking");
    } finally {
      setCancellingId(null);
    }
  };

  const filteredBookings = bookings.filter(b => {
    if (filter === "all") return true;
    return b.status === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-heading text-gray-900">My Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Manage all your event tickets in one place.</p>
        </div>

        <div className="flex bg-gray-100/80 p-1 rounded-xl">
          <button 
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            All
          </button>
          <button 
            onClick={() => setFilter("confirmed")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === "confirmed" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Confirmed
          </button>
          <button 
            onClick={() => setFilter("cancelled")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${filter === "cancelled" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            Cancelled
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => <div key={i} className="h-48 bg-gray-100 rounded-2xl animate-pulse"></div>)}
        </div>
      ) : filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <BookingCard 
              key={booking._id || booking.id} 
              booking={booking} 
              onCancel={handleCancel}
              isCancelling={cancellingId === (booking._id || booking.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Ticket className="h-10 w-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {filter === "all" ? "No bookings found" : `No ${filter} bookings`}
          </h3>
          <p className="text-gray-500 max-w-sm">
            {filter === "all" 
              ? "You haven't booked any events yet. When you do, they will appear here." 
              : `You don't have any ${filter} bookings at the moment.`}
          </p>
        </div>
      )}
    </div>
  );
}
