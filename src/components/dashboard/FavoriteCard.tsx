"use client";

import Link from "next/link";
import { Calendar, MapPin, Heart, Clock, Star, ArrowUpRight } from "lucide-react";
import { Event } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FavoriteCardProps {
  event: Event;
  onRemove: (eventId: string) => void;
  isRemoving?: boolean;
}

export function FavoriteCard({ event, onRemove, isRemoving }: FavoriteCardProps) {
  const dateParts = event.date.split(" ");
  const day = dateParts[0] || "";
  const month = (dateParts[1] || "").substring(0, 3).toUpperCase();

  const categoryGradients: Record<string, string> = {
    Technology: "bg-blue-50 text-blue-700 border-blue-100",
    Music: "bg-purple-50 text-purple-700 border-purple-100",
    Business: "bg-amber-50 text-amber-700 border-amber-100",
    Sports: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Food: "bg-rose-50 text-rose-700 border-rose-100",
    Art: "bg-violet-50 text-violet-700 border-violet-100",
    Education: "bg-sky-50 text-sky-700 border-sky-100",
    Entertainment: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100",
    "Health & Wellness": "bg-teal-50 text-teal-700 border-teal-100",
    Gaming: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };

  const badgeStyle = categoryGradients[event.category] || "bg-muted text-foreground border-border";

  return (
    <Card className="group overflow-hidden flex flex-col h-full bg-card border border-gray-100/80 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-900/[0.04] hover:-translate-y-1.5 transition-all duration-300 ease-out">
      <div className="relative h-52 w-full overflow-hidden bg-gray-150">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

        {day && month && (
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg shadow-black/10 w-12 border border-white/40">
            <span className="bg-primary text-[10px] font-extrabold text-white uppercase w-full py-1 text-center tracking-wider leading-none">
              {month}
            </span>
            <span className="text-foreground text-lg font-black py-1.5 leading-none">
              {day}
            </span>
          </div>
        )}

        <div className="absolute bottom-4 left-4 z-10">
          <span className={cn(
            "text-xs font-semibold px-3 py-1.5 rounded-xl backdrop-blur-md border shadow-sm leading-none inline-block", 
            badgeStyle
          )}>
            {event.category}
          </span>
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            onRemove(event._id || event.id);
          }}
          disabled={isRemoving}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/90 hover:bg-card text-red-500 backdrop-blur-md transition-all duration-200 shadow-md hover:scale-105 border border-white/40 group/btn"
          title="Remove from favorites"
        >
          <Heart className={`h-5 w-5 fill-red-500 transition-colors ${isRemoving ? "opacity-50" : ""}`} />
        </button>
      </div>

      <CardContent className="flex-1 p-5 space-y-4">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2 py-0.5 text-xs text-amber-700 font-bold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{event.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">({event.reviewCount} reviews)</span>
        </div>

        <div className="space-y-1">
          <Link href={`/events/${event.id || event.slug}`} className="hover:text-primary transition-colors block">
            <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {event.title}
            </h3>
          </Link>
        </div>

        <div className="space-y-2 text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-colors">
              <Clock className="h-4 w-4" />
            </div>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/5 transition-colors">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 mt-auto border-t border-border pt-4 flex items-center justify-between">
        <div className="text-left">
          <span className="block text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-none mb-0.5">Ticket</span>
          {event.isFree ? (
            <span className="text-emerald-600 font-extrabold text-sm">Free</span>
          ) : (
            <span className="text-primary font-extrabold text-sm">${event.price}</span>
          )}
        </div>
        <Button asChild size="sm" className="rounded-xl h-9 px-4 bg-gray-900 hover:bg-primary text-white shadow-sm transition-all duration-200 group-hover:shadow-md">
          <Link href={`/events/${event.id || event.slug}`} className="flex items-center gap-1 font-semibold text-xs">
            Details <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
