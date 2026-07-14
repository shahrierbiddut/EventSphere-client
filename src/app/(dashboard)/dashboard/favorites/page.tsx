"use client";

import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";
import { Event } from "@/types";
import { FavoriteCard } from "@/components/dashboard/FavoriteCard";
import { Heart } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const data = await apiRequest<Event[]>("/api/users/me/favorites");
      setFavorites(data);
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (eventId: string) => {
    setRemovingId(eventId);
    try {
      await apiRequest(`/api/users/me/favorites/${eventId}`, {
        method: "DELETE",
      });
      // Optimistic update
      setFavorites(prev => prev.filter(e => (e._id || e.id) !== eventId));
    } catch (error: any) {
      alert(error.message || "Failed to remove favorite");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-heading text-foreground">Favorite Events</h1>
        <p className="text-muted-foreground text-sm mt-1">Events you've saved for later.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-80 bg-muted rounded-2xl animate-pulse"></div>)}
        </div>
      ) : favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((event) => (
            <FavoriteCard 
              key={event._id || event.id} 
              event={event} 
              onRemove={handleRemove}
              isRemoving={removingId === (event._id || event.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-dashed border-border p-12 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4">
            <Heart className="h-10 w-10 text-rose-300 fill-rose-100" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">No favorites yet</h3>
          <p className="text-muted-foreground max-w-sm mb-6">
            You haven't saved any events to your favorites. Browse events and click the heart icon to save them.
          </p>
          <Button asChild>
            <Link href="/explore">Browse Events</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
