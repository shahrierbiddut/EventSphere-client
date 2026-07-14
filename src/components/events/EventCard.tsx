import Link from "next/link"
import { Calendar, Clock, MapPin, Heart, Star, ArrowUpRight } from "lucide-react"
import { Event } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

interface EventCardProps {
  event: Event
  className?: string
}

export function EventCard({ event, className }: EventCardProps) {
  // Parse date into Month & Day for the calendar badge
  const dateParts = event.date.split(" ")
  const day = dateParts[0] || ""
  const month = (dateParts[1] || "").substring(0, 3).toUpperCase()

  // Dynamic category gradient maps for premium aesthetics
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
  }

  const badgeStyle = categoryGradients[event.category] || "bg-gray-50 text-gray-700 border-gray-100"

  return (
    <Card className={cn(
      "group overflow-hidden flex flex-col h-full bg-white border border-gray-100/80 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-900/[0.04] hover:-translate-y-1.5 transition-all duration-300 ease-out", 
      className
    )}>
      {/* Banner Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-gray-150">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Dark subtle overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

        {/* Floating Calendar Badge */}
        {day && month && (
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center bg-white/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg shadow-black/10 w-12 border border-white/40">
            <span className="bg-primary text-[10px] font-extrabold text-white uppercase w-full py-1 text-center tracking-wider leading-none">
              {month}
            </span>
            <span className="text-gray-800 text-lg font-black py-1.5 leading-none">
              {day}
            </span>
          </div>
        )}

        {/* Top Badges */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5 z-10">
          {event.isFeatured && (
            <Badge variant="accent" className="shadow-lg backdrop-blur-md border border-amber-200/50 rounded-xl px-2.5 py-1 text-[11px] font-bold tracking-wide">
              🔥 Featured
            </Badge>
          )}
        </div>

        {/* Bottom Category Badge inside Image */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className={cn(
            "text-xs font-semibold px-3 py-1.5 rounded-xl backdrop-blur-md border shadow-sm leading-none inline-block", 
            badgeStyle
          )}>
            {event.category}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button className="absolute bottom-4 right-4 p-2 rounded-xl bg-white/80 hover:bg-white text-gray-600 hover:text-red-500 backdrop-blur-md transition-all duration-200 shadow-md hover:scale-105 border border-white/20">
          <Heart className="h-4.5 w-4.5" />
        </button>
      </div>

      {/* Card Content */}
      <CardContent className="flex-1 p-5 space-y-4">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-lg px-2 py-0.5 text-xs text-amber-700 font-bold">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            <span>{event.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs text-gray-400 font-medium">({event.reviewCount} reviews)</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <Link href={`/events/${event.id || event.slug}`} className="hover:text-primary transition-colors block">
            <h3 className="font-heading font-bold text-lg text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {event.title}
            </h3>
          </Link>
        </div>

        {/* Info Rows */}
        <div className="space-y-2 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
              <Clock className="h-4 w-4" />
            </div>
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-primary group-hover:bg-primary/5 transition-colors">
              <MapPin className="h-4 w-4" />
            </div>
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="p-5 pt-0 mt-auto border-t border-gray-50 pt-4 flex items-center justify-between">
        {/* Organizer info */}
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-gray-150 bg-gray-50 shrink-0">
            <img
              src={event.organizer.logoUrl || "https://ui-avatars.com/api/?name=EventSphere"}
              alt={event.organizer.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Host</span>
            <span className="text-sm font-semibold text-gray-700 line-clamp-1 max-w-[100px] leading-tight">
              {event.organizer.name}
            </span>
          </div>
        </div>
        
        {/* Price & Details */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-0.5">Ticket</span>
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
        </div>
      </CardFooter>
    </Card>
  )
}
