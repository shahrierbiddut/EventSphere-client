"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Search, XCircle } from "lucide-react";
import { AdminBadge, AdminPagination, AdminSkeletonRow } from "@/components/admin/AdminUI";
import { apiRequest } from "@/lib/api";

interface Booking {
  _id: string;
  user: { name: string; email: string; photoUrl?: string };
  event: { title: string; date: string; time: string; category: string };
  quantity: number;
  totalPrice: number;
  status: string;
  ticketCode: string;
  createdAt: string;
}

interface BookingsResponse {
  bookings: Booking[];
  total: number;
  page: number;
  pages: number;
}

export default function AdminBookingsPage() {
  const [data, setData] = useState<BookingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest<BookingsResponse>(
        `/api/admin/bookings?page=${page}&status=${statusFilter}`
      );
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const updateStatus = async (id: string, status: string) => {
    setActionLoadingId(id);
    try {
      await apiRequest(`/api/admin/bookings/${id}/status`, {
        method: "PATCH",
        body: { status },
      });
      fetchBookings();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Ledger & Bookings</h1>
        <p className="text-xs text-slate-400 font-semibold mt-1">Audit transactions, booking validations, and cancel requests.</p>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-card p-4 rounded-2xl shadow-sm border border-slate-100/80 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full opacity-50 cursor-not-allowed" title="Search disabled on bookings for now">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ticket code or user email..."
            disabled
            className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-200/60 rounded-xl text-xs font-semibold cursor-not-allowed"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="w-full sm:w-auto border border-slate-200/85 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50 text-slate-700 min-w-[160px]"
        >
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Modern Data Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Ticket Code / Date</th>
                <th className="px-6 py-4.5">User</th>
                <th className="px-6 py-4.5">Event details</th>
                <th className="px-6 py-4.5">Order Price</th>
                <th className="px-6 py-4.5">Booking Status</th>
                <th className="px-6 py-4.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <AdminSkeletonRow key={i} cols={6} />)
              ) : data?.bookings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-slate-400 font-semibold text-xs bg-slate-50/20">
                    No bookings logged matching your filters.
                  </td>
                </tr>
              ) : (
                data?.bookings.map((booking) => {
                  const initials = booking.user?.name ? booking.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?";
                  return (
                    <tr key={booking._id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-[10px] font-extrabold text-indigo-650 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg">
                            {booking.ticketCode}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-semibold">
                          {new Date(booking.createdAt).toLocaleDateString()} • {new Date(booking.createdAt).toLocaleTimeString()}
                        </p>
                      </td>
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100/50 border border-indigo-100/30 flex items-center justify-center text-indigo-650 font-bold text-xs flex-shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-xs">{booking.user?.name || "Deleted Account"}</p>
                            <p className="text-slate-450 text-[10px] font-medium">{booking.user?.email || "N/A"}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        <p className="font-bold text-slate-800 text-xs truncate max-w-[200px]">{booking.event?.title || "Unknown Event"}</p>
                        <p className="text-slate-450 text-[10px] font-semibold mt-0.5 capitalize">{booking.event?.date || "TBD"} • {booking.event?.time || "TBD"}</p>
                      </td>
                      <td className="px-6 py-4.5">
                        <p className="text-xs font-bold text-slate-800">{booking.quantity}x Tickets</p>
                        <p className="text-xs font-black text-emerald-600 mt-0.5">${booking.totalPrice.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4.5">
                        <AdminBadge variant={booking.status} />
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {booking.status === "confirmed" && (
                            <button
                              onClick={() => updateStatus(booking._id, "cancelled")}
                              disabled={actionLoadingId === booking._id}
                              className="px-3 py-1.5 text-[10px] font-extrabold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-100/40 rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
                            >
                              <XCircle size={12} /> Cancel Booking
                            </button>
                          )}
                          {booking.status === "cancelled" && (
                            <button
                              onClick={() => updateStatus(booking._id, "confirmed")}
                              disabled={actionLoadingId === booking._id}
                              className="px-3 py-1.5 text-[10px] font-extrabold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 border border-emerald-100/40 rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
                            >
                              <CheckCircle2 size={12} /> Re-Confirm
                            </button>
                          )}
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
    </motion.div>
  );
}
