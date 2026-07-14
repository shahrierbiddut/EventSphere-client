"use client";

import * as React from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Heart,
  Star,
  Users,
  ArrowLeft,
  CircleCheck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { events as fallbackEvents } from "@/data/events";
import { apiRequest, getStoredUser } from "@/lib/api";
import { Event } from "@/types";

export default function EventDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = React.useState<Event | null>(fallbackEvents[0]);
  const [showLoginModal, setShowLoginModal] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [bookingState, setBookingState] = React.useState("");

  React.useEffect(() => {
    const loadEvent = async () => {
      try {
        const data = await apiRequest<Event>(`/api/events/${params.id}`);
        setEvent(data);
      } catch {
        const fallback =
          fallbackEvents.find((entry) => entry.id === params.id) ||
          fallbackEvents[0];
        setEvent(fallback);
      } finally {
        setIsLoading(false);
      }
    };

    if (params?.id) {
      loadEvent();
    }
  }, [params?.id]);

  const handleBook = async () => {
    if (!getStoredUser()) {
      setShowLoginModal(true);
      return;
    }

    try {
      setBookingState("Booking...");
      await apiRequest("/api/bookings", {
        method: "POST",
        body: { eventId: event?.id, quantity: 1 },
      });
      setBookingState("Booked successfully");
      router.refresh();
    } catch (err) {
      setBookingState(err instanceof Error ? err.message : "Booking failed");
    }
  };

  if (isLoading)
    return <div className="p-20 text-center">Loading event...</div>;
  if (!event) return <div className="p-20 text-center">Event not found</div>;

  return (
    <div className="bg-muted min-h-screen pb-20">
      {/* Hero Banner */}
      <div className="w-full h-[40vh] md:h-[50vh] relative bg-black">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="container mx-auto px-4 md:px-6 absolute bottom-0 left-0 right-0 pb-8">
          <Link
            href="/explore"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to events
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-primary hover:bg-primary/90">
              {event.category}
            </Badge>
            {event.isFeatured && <Badge variant="accent">Featured</Badge>}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading text-white mb-4 leading-tight">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/30" />
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span>
                {event.venue}, {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content (Left Column) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Gallery Strip */}
            {event.galleryImages.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
                {event.galleryImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Gallery"
                    className="h-32 md:h-40 w-auto object-cover rounded-xl shrink-0 snap-center border border-border shadow-sm"
                  />
                ))}
              </div>
            )}

            {/* Description */}
            <section className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold font-heading mb-4">
                About This Event
              </h2>
              <p className="text-lg text-foreground leading-relaxed mb-6 font-medium">
                {event.shortDescription}
              </p>
              <div className="prose prose-gray max-w-none text-muted-foreground leading-relaxed space-y-4">
                <p>{event.description}</p>
                <p>
                  Don't miss this opportunity to connect, learn, and grow. Our
                  carefully curated schedule ensures you'll get the most out of
                  your time.
                </p>
              </div>
            </section>

            {/* Schedule */}
            <section className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold font-heading mb-6">
                Event Schedule
              </h2>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                {[
                  {
                    time: "09:00 AM",
                    title: "Registration & Welcome Breakfast",
                    desc: "Collect your badges and grab some coffee.",
                  },
                  {
                    time: "10:00 AM",
                    title: "Opening Keynote",
                    desc: "Setting the stage for an amazing event.",
                  },
                  {
                    time: "12:30 PM",
                    title: "Networking Lunch",
                    desc: "Connect with fellow attendees.",
                  },
                  {
                    time: "02:00 PM",
                    title: "Interactive Workshops",
                    desc: "Deep dive into specialized topics.",
                  },
                  {
                    time: "05:00 PM",
                    title: "Closing Ceremony",
                    desc: "Wrap up and final remarks.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-primary text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                      <Clock className="w-5 h-5" />
                    </div>
                    {/* Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-muted p-4 rounded border border-border shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-foreground">
                          {item.title}
                        </h4>
                        <span className="text-sm font-semibold text-primary">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Map Placeholder */}
            <section className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border">
              <h2 className="text-2xl font-bold font-heading mb-6">
                Venue Location
              </h2>
              <div className="flex items-start gap-3 mb-6">
                <MapPin className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-lg">{event.venue}</h4>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              </div>
              <div className="w-full h-64 bg-gray-200 rounded-xl overflow-hidden relative border border-border">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop"
                  alt="Map Placeholder"
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-lg font-medium shadow-lg flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> {event.venue}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar (Right Column) */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking Card */}
            <div className="bg-card rounded-2xl p-6 shadow-xl border border-border sticky top-24">
              <div className="mb-6">
                <span className="text-sm text-muted-foreground font-medium">
                  Ticket Price
                </span>
                <div className="flex items-end gap-2 mt-1">
                  {event.isFree ? (
                    <span className="text-4xl font-bold font-heading text-success">
                      Free
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-bold font-heading text-foreground">
                        ${event.price}
                      </span>
                      <span className="text-muted-foreground mb-1">/ person</span>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 p-3 bg-amber-50 rounded-lg text-amber-800 border border-amber-100">
                <Users className="h-5 w-5 text-accent" />
                <span className="font-medium text-sm">
                  {event.availableSeats > 0
                    ? `${event.availableSeats} seats left out of ${event.totalSeats}`
                    : "Sold Out!"}
                </span>
              </div>

              <Button
                size="lg"
                className="w-full h-14 text-lg rounded-xl mb-4"
                disabled={
                  event.availableSeats === 0 || bookingState === "Booking..."
                }
                onClick={handleBook}
              >
                {bookingState ||
                  (event.availableSeats > 0 ? "Book Now" : "Sold Out")}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You must be logged in to book tickets.
              </p>

              <hr className="my-6 border-border" />

              <div className="flex justify-between items-center">
                <span className="font-medium text-foreground">
                  Share this event
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-muted hover:bg-muted border-border"
                  >
                    <Share2 className="h-4 w-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-muted hover:bg-muted border-border"
                  >
                    <Heart className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Organizer Card */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h3 className="font-semibold text-lg mb-4">Organized By</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={event.organizer.logoUrl}
                  alt={event.organizer.name}
                  className="h-14 w-14 rounded-full border border-border shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-foreground">
                    {event.organizer.name}
                  </h4>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                    <CircleCheck className="h-4 w-4 text-success" /> Verified
                    Organizer
                  </div>
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-lg">
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Guest Login Required Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-slide-up">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold font-heading mb-3">
              Login Required
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              To book a ticket for <strong>{event.title}</strong>, you need to
              be logged into your EventSphere account.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild size="lg" className="w-full">
                <Link href="/login">Login to Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link href="/register">Create an Account</Link>
              </Button>
              <button
                className="text-sm text-muted-foreground hover:text-foreground mt-4 underline-offset-4 hover:underline"
                onClick={() => setShowLoginModal(false)}
              >
                Cancel and continue browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

