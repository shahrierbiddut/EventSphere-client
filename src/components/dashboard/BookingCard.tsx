"use client";

import { Booking } from "@/types";
import { Calendar, MapPin, Ticket, ExternalLink, XCircle } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  isCancelling?: boolean;
}

export function BookingCard({ booking, onCancel, isCancelling }: BookingCardProps) {
  const isCancelled = booking.status === "cancelled";

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-all">
      <div className="h-48 md:h-auto md:w-64 shrink-0 relative bg-muted">
        <img 
          src={booking.event.imageUrl} 
          alt={booking.event.title} 
          className={`w-full h-full object-cover ${isCancelled ? "grayscale opacity-80" : ""}`}
        />
        {isCancelled && (
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="bg-red-500 text-white font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase shadow-lg">Cancelled</span>
          </div>
        )}
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4 mb-2">
          <Link href={`/events/${booking.event.id || booking.event._id}`} className="hover:text-primary transition-colors">
            <h3 className={`font-bold font-heading text-lg ${isCancelled ? "text-muted-foreground line-through" : "text-foreground"}`}>
              {booking.event.title}
            </h3>
          </Link>
          <Badge variant={isCancelled ? "outline" : "default"} className={isCancelled ? "text-red-600 border-red-200 bg-red-50" : "bg-emerald-50 text-emerald-700 border-emerald-100"}>
            {isCancelled ? "Cancelled" : "Confirmed"}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{booking.event.date} • {booking.event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="truncate">{booking.event.venue}, {booking.event.location}</span>
          </div>
        </div>

        <div className="mt-auto pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase mb-0.5">Tickets</p>
              <div className="flex items-center gap-1.5 font-semibold text-foreground">
                <Ticket className="h-4 w-4 text-primary" /> {booking.quantity}
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase mb-0.5">Total Paid</p>
              <div className="font-semibold text-foreground">
                ${booking.totalPrice}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {!isCancelled && onCancel && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
                onClick={() => onCancel(booking._id || booking.id)}
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : <><XCircle className="h-4 w-4 mr-1.5" /> Cancel</>}
              </Button>
            )}
            <Button size="sm" variant={isCancelled ? "outline" : "default"} asChild>
              <Link href={`/events/${booking.event.id || booking.event._id}`}>
                View Event <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
