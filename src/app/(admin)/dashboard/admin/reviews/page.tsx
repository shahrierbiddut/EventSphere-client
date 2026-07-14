"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import { AdminPagination, AdminSkeletonRow, ConfirmationModal } from "@/components/admin/AdminUI";
import { apiRequest } from "@/lib/api";

interface Review {
  _id: string;
  user: { name: string; photoUrl?: string };
  event: { title: string };
  rating: number;
  review: string;
  isHidden: boolean;
  createdAt: string;
}

interface ReviewsResponse {
  reviews: Review[];
  total: number;
  page: number;
  pages: number;
}

export default function AdminReviewsPage() {
  const [data, setData] = useState<ReviewsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Modal states
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest<ReviewsResponse>(`/api/admin/reviews?page=${page}`);
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleToggleHide = async (id: string) => {
    setActionLoadingId(id);
    try {
      await apiRequest(`/api/admin/reviews/${id}/hide`, { method: "PATCH" });
      fetchReviews();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async () => {
    if (!selectedReview) return;
    setActionLoadingId(selectedReview._id);
    try {
      await apiRequest(`/api/admin/reviews/${selectedReview._id}`, { method: "DELETE" });
      setDeleteModalOpen(false);
      fetchReviews();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoadingId(null);
    }
  };

  const openDeleteModal = (review: Review) => {
    setSelectedReview(review);
    setDeleteModalOpen(true);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-base ${i < rating ? "text-amber-500" : "text-slate-200"}`}>
        ★
      </span>
    ));
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
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">User Reviews</h1>
          <p className="text-xs text-slate-400 font-semibold mt-1">Moderate user reviews, adjust visibility settings, and purge spam comments.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
              <tr>
                <th className="px-6 py-4.5">Account User</th>
                <th className="px-6 py-4.5">Target Event</th>
                <th className="px-6 py-4.5">Star Rating & Feedback Review</th>
                <th className="px-6 py-4.5 text-center">Status</th>
                <th className="px-6 py-4.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <AdminSkeletonRow key={i} cols={5} />)
              ) : data?.reviews.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400 font-semibold text-xs bg-slate-50/20">
                    No reviews logged on the platform yet.
                  </td>
                </tr>
              ) : (
                data?.reviews.map((review) => {
                  const initials = review.user?.name ? review.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "?";
                  return (
                    <tr key={review._id} className={`transition-colors ${review.isHidden ? 'bg-slate-50/50' : 'hover:bg-slate-50/30'}`}>
                      <td className="px-6 py-4.5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100/50 border border-indigo-100/30 flex items-center justify-center text-indigo-650 font-bold text-xs flex-shrink-0">
                            {initials}
                          </div>
                          <p className="font-bold text-slate-800 text-xs">{review.user?.name || "Unknown User"}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        <p className="font-bold text-slate-800 text-xs line-clamp-1 max-w-[180px]">{review.event?.title || "Unknown Event"}</p>
                      </td>
                      <td className="px-6 py-4.5 min-w-[320px]">
                        <div className="flex items-center gap-1 mb-1.5">
                          <div className="flex">{renderStars(review.rating)}</div>
                          <span className="text-[10px] text-slate-400 font-bold ml-2">
                            {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </span>
                        </div>
                        <p className={`text-xs text-slate-650 leading-relaxed font-medium ${review.isHidden ? 'line-through opacity-40' : ''}`}>
                          {review.review}
                        </p>
                      </td>
                      <td className="px-6 py-4.5 text-center whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          review.isHidden 
                            ? "bg-rose-500/10 text-rose-600 border-rose-500/25" 
                            : "bg-emerald-500/10 text-emerald-600 border-emerald-500/25"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${review.isHidden ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                          {review.isHidden ? "Hidden" : "Visible"}
                        </span>
                      </td>
                      <td className="px-6 py-4.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleToggleHide(review._id)}
                            disabled={actionLoadingId === review._id}
                            className={`p-2 rounded-xl transition-all ${
                              review.isHidden
                                ? "text-emerald-600 hover:bg-emerald-50"
                                : "text-amber-605 hover:bg-amber-50 text-amber-600"
                            } disabled:opacity-50`}
                            title={review.isHidden ? "Make review visible" : "Hide/Suppress review"}
                          >
                            {review.isHidden ? <Eye size={16} /> : <EyeOff size={16} />}
                          </button>
                          <button
                            onClick={() => openDeleteModal(review)}
                            disabled={actionLoadingId === review._id}
                            className="p-2 text-rose-650 text-rose-600 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-50"
                            title="Delete review"
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
        title="Delete User Review?"
        message="This action cannot be undone. The review feedback and rating will be permanently deleted from database archives."
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
        isLoading={actionLoadingId === selectedReview?._id}
      />
    </motion.div>
  );
}
