"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Upload, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

export default function AdminAddEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "music",
    date: "",
    time: "",
    location: "",
    venue: "",
    price: 0,
    isFree: false,
    availableSeats: 100,
    totalSeats: 100,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
    shortDescription: "",
    description: "",
    isPublished: true,
    organizer: {
      name: "EventSphere",
      contactEmail: "admin@eventsphere.com",
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name.includes("organizer.")) {
      const orgField = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        organizer: { ...prev.organizer, [orgField]: value }
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === "number" ? Number(value) : type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateSlug = () => {
    if (formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiRequest("/api/admin/events", {
        method: "POST",
        body: formData,
      });
      router.push("/dashboard/admin/events");
    } catch (err: any) {
      setError(err.message || "Failed to create event");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/events" className="p-2 bg-card rounded-xl border border-border text-muted-foreground hover:text-indigo-600 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add New Event</h1>
          <p className="text-sm text-muted-foreground mt-1">Fill in the details to create a new event.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm border border-rose-100">
            {error}
          </div>
        )}

        {/* Section 1: Basic Info */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Event Title <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                onBlur={generateSlug}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Slug (URL) <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="slug"
                required
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-muted"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Category <span className="text-rose-500">*</span></label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm bg-card"
              >
                <option value="music">Music</option>
                <option value="technology">Technology</option>
                <option value="food">Food & Drink</option>
                <option value="art">Art & Culture</option>
                <option value="business">Business</option>
                <option value="sports">Sports</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Cover Image URL <span className="text-rose-500">*</span></label>
              <input
                type="url"
                name="imageUrl"
                required
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Short Description <span className="text-rose-500">*</span></label>
            <textarea
              name="shortDescription"
              required
              rows={2}
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Section 2: Date & Location */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Date & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Date <span className="text-rose-500">*</span></label>
              <input
                type="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Time <span className="text-rose-500">*</span></label>
              <input
                type="time"
                name="time"
                required
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">City / Location <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Venue Name <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="venue"
                required
                value={formData.venue}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Tickets & Capacity */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Tickets & Capacity</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="flex items-center justify-between text-sm font-medium text-foreground">
                Ticket Price ($)
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFree"
                    checked={formData.isFree}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                  />
                  <span className="text-xs font-normal text-muted-foreground">Is Free?</span>
                </label>
              </label>
              <input
                type="number"
                name="price"
                min="0"
                required={!formData.isFree}
                disabled={formData.isFree}
                value={formData.isFree ? 0 : formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm disabled:bg-muted disabled:text-muted-foreground"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Total Seats Capacity <span className="text-rose-500">*</span></label>
              <input
                type="number"
                name="totalSeats"
                min="1"
                required
                value={formData.totalSeats}
                onChange={(e) => setFormData(prev => ({ ...prev, totalSeats: Number(e.target.value), availableSeats: Number(e.target.value) }))}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Details & Organizer */}
        <div className="bg-card p-6 rounded-2xl shadow-sm border border-border space-y-4">
          <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Full Description</h2>
          <div className="space-y-1.5">
            <textarea
              name="description"
              required
              rows={6}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide a detailed description of the event..."
              className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
            />
          </div>

          <h2 className="text-lg font-bold text-foreground border-b border-border pb-2 mt-6">Organizer Info</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Organizer Name <span className="text-rose-500">*</span></label>
              <input
                type="text"
                name="organizer.name"
                required
                value={formData.organizer.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Contact Email <span className="text-rose-500">*</span></label>
              <input
                type="email"
                name="organizer.contactEmail"
                required
                value={formData.organizer.contactEmail}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between p-6 bg-muted rounded-2xl border border-border">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="isPublished"
              checked={formData.isPublished}
              onChange={handleChange}
              className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <div>
              <p className="text-sm font-bold text-foreground">Publish Immediately</p>
              <p className="text-xs text-muted-foreground">Uncheck to save as draft.</p>
            </div>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-70"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle2 size={20} />
            )}
            {loading ? "Creating..." : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
}
