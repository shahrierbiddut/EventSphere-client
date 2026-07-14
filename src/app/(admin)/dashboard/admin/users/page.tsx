"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, Ban, Trash2, CheckCircle, ShieldAlert } from "lucide-react";
import { AdminBadge, AdminPagination, AdminSkeletonRow, ConfirmationModal } from "@/components/admin/AdminUI";
import { apiRequest } from "@/lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
  photoUrl?: string;
  role: string;
  createdAt: string;
}

interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  pages: number;
}

export default function AdminUsersPage() {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState(false);
  
  // Modal states
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
  }, [debouncedSearchTerm, statusFilter]);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiRequest<UsersResponse>(
        `/api/admin/users?page=${page}&q=${debouncedSearchTerm}&status=${statusFilter}`
      );
      setData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchTerm, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleBlockToggle = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await apiRequest(`/api/admin/users/${selectedUser._id}/block`, { method: "PATCH" });
      setBlockModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    setActionLoading(true);
    try {
      await apiRequest(`/api/admin/users/${selectedUser._id}`, { method: "DELETE" });
      setDeleteModalOpen(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  };

  const openBlockModal = (user: User) => {
    setSelectedUser(user);
    setBlockModalOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">User Management</h1>
        <p className="text-xs text-slate-400 font-semibold mt-1">Audit permissions, role tiers, and active status accounts.</p>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-card p-4 rounded-2xl shadow-sm border border-slate-100/80 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Filter accounts by name or email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2 bg-slate-50 hover:bg-slate-100/50 focus:bg-card rounded-xl border border-slate-200/60 focus:border-indigo-400 focus:outline-none transition-all text-xs font-semibold"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full sm:w-auto border border-slate-200/85 rounded-xl px-4 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 bg-slate-50 text-slate-700 min-w-[160px]"
        >
          <option value="">All Account Tiers</option>
          <option value="attendee">Attendees</option>
          <option value="organizer">Organizers</option>
          <option value="admin">Administrators</option>
          <option value="blocked">Suspended</option>
        </select>
      </div>

      {/* Modern Data Table */}
      <div className="bg-card rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Account User</th>
                <th className="px-6 py-4.5">Security Level</th>
                <th className="px-6 py-4.5">Registration Date</th>
                <th className="px-6 py-4.5 text-right">Administrative Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => <AdminSkeletonRow key={i} cols={4} />)
              ) : data?.users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-slate-400 font-semibold text-xs bg-slate-50/20">
                    No active accounts found matching the search criteria.
                  </td>
                </tr>
              ) : (
                data?.users.map((user) => {
                  const isBlocked = user.role === "blocked";
                  const initials = user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
                  return (
                    <tr key={user._id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4.5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500/10 to-sky-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 font-bold text-xs flex-shrink-0">
                            {initials}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800 text-xs">{user.name}</p>
                            <p className="text-slate-450 text-[10px] font-medium">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4.5">
                        <AdminBadge variant={user.role} />
                      </td>
                      <td className="px-6 py-4.5 text-slate-500 text-xs font-semibold">
                        {new Date(user.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </td>
                      <td className="px-6 py-4.5 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {user.role !== "admin" && (
                            <>
                              <button
                                onClick={() => openBlockModal(user)}
                                className={`p-2 rounded-xl transition-all ${
                                  isBlocked
                                    ? "text-emerald-600 hover:bg-emerald-50"
                                    : "text-amber-600 hover:bg-amber-50"
                                }`}
                                title={isBlocked ? "Restore/Unblock account" : "Suspend account"}
                              >
                                {isBlocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                              </button>
                              <button
                                onClick={() => openDeleteModal(user)}
                                className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                                title="Permanently delete account"
                              >
                                <Trash2 size={16} />
                              </button>
                            </>
                          )}
                          {user.role === "admin" && (
                            <span className="text-[10px] uppercase font-extrabold text-slate-300 pr-3">System Protected</span>
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

      {/* Modals */}
      <ConfirmationModal
        isOpen={blockModalOpen}
        onClose={() => setBlockModalOpen(false)}
        onConfirm={handleBlockToggle}
        title={selectedUser?.role === "blocked" ? "Restore Account Access?" : "Suspend User Account?"}
        message={
          selectedUser?.role === "blocked"
            ? `Are you sure you want to unblock ${selectedUser?.name}? They will instantly regain ability to sign in and register for events.`
            : `Are you sure you want to suspend access for ${selectedUser?.name}? Their session will expire and they will be barred from signing in.`
        }
        confirmLabel={selectedUser?.role === "blocked" ? "Unblock Account" : "Suspend Access"}
        confirmVariant={selectedUser?.role === "blocked" ? "warning" : "danger"}
        isLoading={actionLoading}
      />

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Permanently Delete User Profile?"
        message={`This action cannot be undone. All data corresponding to user account ${selectedUser?.name} will be completely purged from EventSphere servers.`}
        confirmLabel="Confirm Purge"
        confirmVariant="danger"
        isLoading={actionLoading}
      />
    </motion.div>
  );
}
