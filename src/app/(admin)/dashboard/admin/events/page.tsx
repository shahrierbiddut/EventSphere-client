"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { AdminBadge, AdminPagination, AdminSkeletonRow, ConfirmationModal } from "@/components/admin/AdminUI";
import { apiRequest } from "@/lib/api";

interface Event {
  id: string;
  _id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  status: string;
  isPublished: boolean;
  createdAt: string;
}

interface EventsResponse {
  events: Event[];
  total: number;
  page: number;
  pages: number;
}

export default function AdminEventsPage() {
  const [data, setData] = useState<EventsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Reset page to 1 on filter changes
  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm, categoryFilter, statusFilter]);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest<EventsResponse>(
        `/api/admin/events?page=${page}&q=${debouncedSearchTerm}&category=${categoryFilter}&status=${statusFilter}`
      );
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchTerm, categoryFilter, statusFilter]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleTogglePublish = async (event: Event) => {
    try {
      await apiRequest(`/api/admin/events/${event._id}/publish`, { method: "PATCH" });
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateStatus = async (event: Event, status: string) => {
    try {
      await apiRequest(`/api/admin/events/${event._id}/status`, { 
        method: "PATCH",
        body: { status }
      });
      fetchEvents();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    setActionLoading(true);
    try {
      await apiRequest(`/api/admin/events/${selectedEvent._id}`, { method: "DELETE" });
      setDeleteModalOpen(false);
      fetchEvents();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteModal = (event: Event) => {
    setSelectedEvent(event);
    setDeleteModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Events Management</h1>
          <p className="text-xs text-slate-400 font-semibold mt-1">Audit tickets capacity, publication states, and scheduling logs.</p>
        </div>
        <Link
          href="/dashboard/admin/events/add"
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/10 transition-all"
        >
          <Plus size={16} />
          Create Event
        </Link>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-card p-4 rounded-2xl shadow-sm border border-slate-100/80 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search events by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 hover:bg-slate-100/50 focus:bg-card rounded-xl border border-slate-200/60 focus:border-indigo-400 focus:outline-none transition-all text-xs font-semibold"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border border-slate-200/85 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50 text-slate-700 min-w-[140px]"
          >
            <option value="">All Categories</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="food">Food & Drink</option>
            <option value="art">Art & Culture</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-slate-200/85 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50 text-slate-700 min-w-[140px]"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="rejected">Rejected</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Event Name</th>
                <th className="px-6 py-4.5">Event Date</th>
                <th className="px-6 py-4.5">Ticket Price</th>
                <th className="px-6 py-4.5">Capacity Utilization</th>
                <th className="px-6 py-4.5">Status</th>
                <th className="px-6 py-4.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <AdminSkeletonRow key={i} cols={6} />)
              ) : data?.events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400 font-semibold text-xs bg-slate-50/20">
                    No events matching criteria found.
                  </td>
                </tr>
              ) : (
                data?.events.map((event) => {
                  const ratio = event.availableSeats / event.totalSeats;
                  const percent = Math.max(0, Math.min(100, Math.floor(ratio * 100)));
                  return (
                    <tr key={event._id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4.5">
                        <p className="font-bold text-slate-800 text-xs truncate max-w-[220px]">{event.title}</p>
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase mt-0.5">{event.category}</p>
                      </td>
                      <td className="px-6 py-4.5">
                        <p className="font-semibold text-slate-700 text-xs">{event.date}</p>
                        <p className="text-slate-450 text-[10px] font-medium mt-0.5">{event.time}</p>
                      </td>
                      <td className="px-6 py-4.5 font-bold text-slate-850 text-xs">
                        {event.price === 0 ? (
                          <span className="text-emerald-600">Free</span>
                        ) : (
                          `$${event.price.toLocaleString()}`
                        )}
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="w-full bg-slate-100 border border-slate-100 rounded-full h-2 mb-1.5 max-w-[100px] overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              ratio < 0.2 ? 'bg-gradient-to-r from-rose-500 to-rose-600' : 'bg-gradient-to-r from-indigo-500 to-indigo-600'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400 font-bold">
                          {event.availableSeats.toLocaleString()} / {event.totalSeats.toLocaleString()} left
                        </span>
                      </td>
                      <td className="px-6 py-4.5">
                        <AdminBadge variant={event.status || (event.isPublished ? "published" : "draft")} />
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {event.status === "pending" ? (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(event, "published")}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                                title="Approve event"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(event, "rejected")}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                title="Reject event"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleTogglePublish(event)}
                              className="p-2 text-slate-450 hover:bg-slate-100 hover:text-slate-750 rounded-xl transition-all"
                              title={event.isPublished ? "Unpublish and hide event" : "Publish event"}
                            >
                              {event.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          )}
                          <Link
                            href={`/dashboard/admin/events/edit/${event._id}`}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                            title="Edit event"
                          >
                            <Edit size={16} />
                          </Link>
                          <button
                            onClick={() => openDeleteModal(event)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                            title="Permanently delete event"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {data && (
          <AdminPagination
            page={data.page}
            pages={data.pages}
            total={data.total}
            onPageChange={setPage}
          />
        )}
      </div>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Platform Event?"
        message={`Are you sure you want to permanently delete "${selectedEvent?.title}"? All users booked for this event will still preserve ticket records but the event listing will be lost.`}
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        isLoading={actionLoading}
      />
    </motion.div>
  );
}
