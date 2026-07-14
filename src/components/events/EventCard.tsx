import Link from "next/link"
import { Clock, MapPin, Heart, Star, ArrowUpRight } from "lucide-react"
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
    Technology: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
    Music: "bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/20",
    Business: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    Sports: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    Food: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20",
    Art: "bg-violet-500/10 text-violet-700 dark:text-violet-300 border-violet-500/20",
    Education: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
    Entertainment: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/20",
    "Health & Wellness": "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
    Gaming: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
  }

  const badgeStyle = categoryGradients[event.category] || "bg-muted text-muted-foreground border-border"

  return (
    <Card className={cn(
      "group overflow-hidden flex flex-col h-full bg-card border border-border rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 transition-all duration-300 ease-out", 
      className
    )}>
      {/* Banner Image Container */}
      <div className="relative h-52 w-full overflow-hidden bg-muted">
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
          <div className="absolute top-4 left-4 z-10 flex flex-col items-center bg-background/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg shadow-black/10 w-12 border border-white/40">
            <span className="bg-primary text-[10px] font-extrabold text-white uppercase w-full py-1 text-center tracking-wider leading-none">
              {month}
            </span>
            <span className="text-foreground text-lg font-black py-1.5 leading-none">
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
        <button className="absolute bottom-4 right-4 p-2 rounded-xl bg-background/80 hover:bg-background text-muted-foreground hover:text-red-500 backdrop-blur-md transition-all duration-200 shadow-md hover:scale-105 border border-white/20">
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
          <span className="text-xs text-muted-foreground font-medium">({event.reviewCount} reviews)</span>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <Link href={`/events/${event.id || event.slug}`} className="hover:text-primary transition-colors block">
            <h3 className="font-heading font-bold text-lg text-card-foreground group-hover:text-primary transition-colors leading-snug line-clamp-2">
              {event.title}
            </h3>
          </Link>
        </div>

        {/* Info Rows */}
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

      {/* Card Footer */}
      <CardFooter className="p-5 pt-0 mt-auto border-t border-border pt-4 flex items-center justify-between">
        {/* Organizer info */}
        <div className="flex items-center gap-2">
          <div className="relative h-8 w-8 rounded-full overflow-hidden border border-border bg-muted shrink-0">
            <img
              src={event.organizer.logoUrl || "https://ui-avatars.com/api/?name=EventSphere"}
              alt={event.organizer.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground font-bold uppercase tracking-wider leading-none mb-0.5">Host</span>
            <span className="text-sm font-semibold text-foreground line-clamp-1 max-w-[100px] leading-tight">
              {event.organizer.name}
            </span>
          </div>
        </div>
        
        {/* Price & Details */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="block text-[10px] text-muted-foreground font-bold uppercase tracking-wider leading-none mb-0.5">Ticket</span>
            {event.isFree ? (
              <span className="text-emerald-600 font-extrabold text-sm">Free</span>
            ) : (
              <span className="text-primary font-extrabold text-sm">${event.price}</span>
            )}
          </div>
          <Button asChild size="sm" className="rounded-xl h-9 px-4 bg-foreground hover:bg-primary text-background hover:text-white shadow-sm transition-all duration-200 group-hover:shadow-md">
            <Link href={`/events/${event.id || event.slug}`} className="flex items-center gap-1 font-semibold text-xs">
              Details <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
