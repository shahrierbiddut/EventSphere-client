"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Trash2, Calendar, Reply, ArrowLeft } from "lucide-react";
import { AdminEmptyState, ConfirmationModal } from "@/components/admin/AdminUI";
import { apiRequest } from "@/lib/api";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  const fetchMessages = async () => {
    try {
      const data = await apiRequest<ContactMessage[]>("/api/admin/messages");
      setMessages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleSelectMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await apiRequest(`/api/admin/messages/${msg._id}/read`, { method: "PATCH" });
        setMessages(messages.map(m => m._id === msg._id ? { ...m, isRead: true } : m));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async () => {
    if (!messageToDelete) return;
    try {
      await apiRequest(`/api/admin/messages/${messageToDelete._id}`, { method: "DELETE" });
      setMessages(messages.filter(m => m._id !== messageToDelete._id));
      if (selectedMessage?._id === messageToDelete._id) {
        setSelectedMessage(null);
      }
      setDeleteModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="h-[calc(100vh-120px)] flex flex-col space-y-4"
    >
      <div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Contact Messages</h1>
        <p className="text-xs text-slate-400 font-semibold mt-1">Manage, read, and reply to user queries and help requests.</p>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-sm border border-slate-100 flex overflow-hidden min-h-0">
        {/* Inbox List */}
        <div className="w-full md:w-5/12 lg:w-4/12 border-r border-slate-100 flex flex-col bg-slate-50/30">
          <div className="p-4 border-b border-slate-100 bg-white">
            <h2 className="text-xs font-black uppercase text-slate-800 tracking-wider">
              Inbox ({messages.filter(m => !m.isRead).length} unread)
            </h2>
          </div>
          
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100/70">
            {loading ? (
              <div className="p-4 space-y-4 animate-pulse">
                {[1, 2, 3].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                    <div className="h-3 bg-slate-100 rounded w-full" />
                    <div className="h-3 bg-slate-100 rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="p-8 text-center text-slate-400 font-semibold text-xs">
                Your inbox is completely clear.
              </div>
            ) : (
              messages.map(msg => (
                <button
                  key={msg._id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`w-full text-left p-4.5 hover:bg-slate-100/40 transition-colors border-l-4 ${
                    selectedMessage?._id === msg._id ? "bg-indigo-50/30 border-indigo-600" : "border-l-transparent"
                  }`}
                >
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <p className={`text-xs truncate ${msg.isRead ? "text-slate-500 font-semibold" : "text-slate-800 font-extrabold"}`}>
                      {msg.name}
                    </p>
                    <p className="text-[9px] text-slate-400 font-bold whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </p>
                  </div>
                  <p className={`text-xs mb-1.5 truncate ${msg.isRead ? "text-slate-500 font-medium" : "text-slate-800 font-bold"}`}>
                    {msg.subject}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium line-clamp-1 leading-relaxed">
                    {msg.message}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Message Detail View */}
        <div className="hidden md:flex md:w-7/12 lg:w-8/12 flex-col bg-white">
          {selectedMessage ? (
            <div className="flex-1 flex flex-col min-h-0 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="p-6 border-b border-slate-100 flex justify-between items-start gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800 tracking-tight mb-4">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-50 to-indigo-100 border border-indigo-100 flex items-center justify-center text-indigo-600 font-extrabold text-sm flex-shrink-0">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-xs">{selectedMessage.name}</p>
                      <p className="text-xs text-slate-450 font-semibold">{selectedMessage.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-3 flex-shrink-0">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold">
                    <Calendar size={13} />
                    {new Date(selectedMessage.createdAt).toLocaleString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                    >
                      <Reply size={14} /> Reply
                    </a>
                    <button
                      onClick={() => {
                        setMessageToDelete(selectedMessage);
                        setDeleteModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                      title="Delete message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 overflow-y-auto">
                <div className="prose prose-sm max-w-none text-slate-600 font-medium text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <AdminEmptyState
                icon={<Mail size={24} />}
                title="No message selected"
                description="Select any message from the inbox navigation list to load and view full contents."
              />
            </div>
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Contact Inquiry?"
        message="Are you sure you want to permanently delete this message inquiry? This action cannot be reverted."
        confirmLabel="Confirm Delete"
        confirmVariant="danger"
      />
    </motion.div>
  );
}
