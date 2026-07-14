"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Loader2, PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";

export default function CreateEventPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const eventData = {
      title: formData.get("title"),
      category: formData.get("category"),
      date: formData.get("date"),
      time: formData.get("time"),
      location: formData.get("location"),
      venue: formData.get("venue"),
      price: Number(formData.get("price")),
      isFree: Number(formData.get("price")) === 0,
      availableSeats: Number(formData.get("seats")),
      totalSeats: Number(formData.get("seats")),
      imageUrl: formData.get("imageUrl"),
      shortDescription: formData.get("shortDescription"),
      description: formData.get("description"),
      organizer: {
        name: user?.name || "Independent Organizer",
        contactEmail: user?.email || "",
      }
    };

    try {
      await apiRequest("/api/events", {
        method: "POST",
        body: eventData,
      });
      
      setStatus({ 
        type: "success", 
        text: "Event submitted successfully! It will be visible on the explore page once an admin approves it." 
      });
      
      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setStatus({ 
        type: "error", 
        text: error.message || "Failed to submit event. Please try again." 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-100">Create an Event</h1>
        <p className="text-slate-400 text-sm mt-1">Submit a new event. It will be reviewed by an admin before going live.</p>
      </div>

      {status && (
        <div className={`p-4 rounded-xl flex gap-3 ${status.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}>
          {status.type === "success" ? <CheckCircle2 className="h-5 w-5 shrink-0" /> : <AlertCircle className="h-5 w-5 shrink-0" />}
          <p className="text-sm font-medium">{status.text}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#0F172A] rounded-3xl border border-slate-800 p-8 shadow-sm space-y-8">
        
        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800/80 pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-slate-300">Event Title *</label>
              <Input id="title" name="title" required placeholder="e.g. Summer Music Festival" className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600" />
            </div>
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-slate-300">Category *</label>
              <select 
                id="category" 
                name="category" 
                required
                className="flex h-11 w-full rounded-xl border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              >
                <option value="">Select a category</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Food">Food</option>
                <option value="Sports">Sports</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium text-slate-300">Date *</label>
              <Input id="date" name="date" type="date" required className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
            <div className="space-y-2">
              <label htmlFor="time" className="text-sm font-medium text-slate-300">Time *</label>
              <Input id="time" name="time" type="time" required className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600 [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert" />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800/80 pb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="venue" className="text-sm font-medium text-slate-300">Venue Name *</label>
              <Input id="venue" name="venue" required placeholder="e.g. Grand Convention Center" className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600" />
            </div>
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-slate-300">City / Address *</label>
              <Input id="location" name="location" required placeholder="e.g. Dhaka, Bangladesh" className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600" />
            </div>
          </div>
        </div>

        {/* Tickets & Media */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800/80 pb-2">Tickets & Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium text-slate-300">Ticket Price ($) *</label>
              <Input id="price" name="price" type="number" min="0" step="0.01" required placeholder="0 for free" className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600" />
            </div>
            <div className="space-y-2">
              <label htmlFor="seats" className="text-sm font-medium text-slate-300">Total Seats *</label>
              <Input id="seats" name="seats" type="number" min="1" required placeholder="e.g. 100" className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600" />
            </div>
            <div className="space-y-2">
              <label htmlFor="imageUrl" className="text-sm font-medium text-slate-300">Cover Image URL *</label>
              <Input id="imageUrl" name="imageUrl" type="url" required placeholder="https://example.com/image.jpg" className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600" />
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-200 border-b border-slate-800/80 pb-2">Details</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="shortDescription" className="text-sm font-medium text-slate-300">Short Description *</label>
              <Input id="shortDescription" name="shortDescription" required placeholder="A brief summary of your event" className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600" />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-slate-300">Full Description *</label>
              <textarea 
                id="description" 
                name="description" 
                rows={6} 
                required
                placeholder="Provide all the details attendees need to know..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900/50 px-3 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-w-[200px] h-12 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-600/20 border-none gap-2">
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlusCircle className="h-4 w-4" />
            )}
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </Button>
        </div>
      </form>
    </div>
  );
}
