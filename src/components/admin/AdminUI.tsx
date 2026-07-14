"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";

// ==========================================
// AdminBadge
// ==========================================
type BadgeVariant =
  | "confirmed"
  | "cancelled"
  | "pending"
  | "published"
  | "draft"
  | "blocked"
  | "admin"
  | "organizer"
  | "attendee"
  | "active"
  | "hidden"
  | "visible"
  | "rejected";

const badgeConfig: Record<BadgeVariant, { label: string; className: string; dotColor: string }> = {
  confirmed:  { label: "Confirmed",  className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25", dotColor: "bg-emerald-500" },
  cancelled:  { label: "Cancelled",  className: "bg-rose-500/10 text-rose-600 border-rose-500/25", dotColor: "bg-rose-500" },
  pending:    { label: "Pending",    className: "bg-amber-500/10 text-amber-600 border-amber-500/25", dotColor: "bg-amber-500" },
  published:  { label: "Published",  className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25", dotColor: "bg-emerald-500" },
  draft:      { label: "Draft",      className: "bg-slate-500/10 text-slate-500 border-slate-500/25", dotColor: "bg-slate-500" },
  blocked:    { label: "Blocked",    className: "bg-rose-500/10 text-rose-600 border-rose-500/25", dotColor: "bg-rose-500" },
  admin:      { label: "Admin",      className: "bg-indigo-500/10 text-indigo-600 border-indigo-500/25", dotColor: "bg-indigo-500" },
  organizer:  { label: "Organizer",  className: "bg-sky-500/10 text-sky-600 border-sky-500/25", dotColor: "bg-sky-500" },
  attendee:   { label: "Attendee",   className: "bg-teal-500/10 text-teal-600 border-teal-500/25", dotColor: "bg-teal-500" },
  active:     { label: "Active",     className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25", dotColor: "bg-emerald-500" },
  hidden:     { label: "Hidden",     className: "bg-rose-500/10 text-rose-600 border-rose-500/25", dotColor: "bg-rose-500" },
  visible:    { label: "Visible",    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/25", dotColor: "bg-emerald-500" },
  rejected:   { label: "Rejected",   className: "bg-rose-500/10 text-rose-600 border-rose-500/25", dotColor: "bg-rose-500" },
};

interface AdminBadgeProps {
  variant: BadgeVariant | string;
  className?: string;
}

export function AdminBadge({ variant, className = "" }: AdminBadgeProps) {
  const config = badgeConfig[variant as BadgeVariant] || {
    label: variant,
    className: "bg-slate-500/10 text-slate-600 border-slate-500/25",
    dotColor: "bg-slate-500",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.className} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}

// ==========================================
// ConfirmationModal
// ==========================================
interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  confirmVariant?: "danger" | "warning";
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  confirmVariant = "danger",
  onConfirm,
  onClose,
  isLoading,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="relative bg-white/95 border border-slate-100 rounded-2xl shadow-2xl p-6 w-full max-w-sm z-10"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${confirmVariant === "danger" ? "bg-rose-50" : "bg-amber-50"}`}>
              <AlertCircle size={24} className={confirmVariant === "danger" ? "text-rose-600" : "text-amber-600"} />
            </div>
            <h3 className="text-lg font-extrabold text-center text-slate-800 mb-2">{title}</h3>
            <p className="text-xs text-center text-slate-400 font-medium leading-relaxed mb-6">{message}</p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                disabled={isLoading}
                className={`flex-1 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-colors focus:outline-none ${
                  confirmVariant === "danger"
                    ? "bg-rose-600 hover:bg-rose-700 shadow-lg shadow-rose-500/10"
                    : "bg-amber-600 hover:bg-amber-700 shadow-lg shadow-amber-500/10"
                } disabled:opacity-60`}
              >
                {isLoading ? "Please wait..." : confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// AdminEmptyState
// ==========================================
interface AdminEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function AdminEmptyState({ icon, title, description, action }: AdminEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && (
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-100/50 flex items-center justify-center mb-5 text-indigo-500 shadow-sm">
          {icon}
        </div>
      )}
      <h3 className="text-base font-bold text-slate-800 mb-1.5">{title}</h3>
      {description && <p className="text-xs text-slate-400 font-medium max-w-xs leading-relaxed mb-5">{description}</p>}
      {action}
    </div>
  );
}

// ==========================================
// AdminSkeletonRow
// ==========================================
export function AdminSkeletonRow({ cols = 5 }: { cols?: number }) {
  return (
    <tr className="animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-6 py-4">
          <div className="h-4 bg-slate-100 rounded-lg w-3/4" />
        </td>
      ))}
    </tr>
  );
}

// ==========================================
// AdminPagination
// ==========================================
interface AdminPaginationProps {
  page: number;
  pages: number;
  total: number;
  onPageChange: (page: number) => void;
}

export function AdminPagination({ page, pages, total, onPageChange }: AdminPaginationProps) {
  if (pages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 bg-card">
      <p className="text-xs text-slate-400 font-semibold">
        Showing page <span className="text-slate-700 font-extrabold">{page}</span> of <span className="text-slate-700 font-extrabold">{pages}</span> — <span className="text-slate-700 font-extrabold">{total}</span> total results
      </p>
      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {Array.from({ length: Math.min(pages, 5) }).map((_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`w-9 h-9 text-xs font-bold rounded-xl transition-all ${
                page === pageNum
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/10"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
