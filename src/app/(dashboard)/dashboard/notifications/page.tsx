"use client";

import { useState } from "react";
import { Notification } from "@/types";
import { Bell, Ticket, Clock } from "lucide-react";

// Mock data since we didn't add a Notification model to the backend
const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Booking Confirmed!",
    message: "Your booking for 'Global Tech Summit 2026' has been confirmed. View your ticket in My Bookings.",
    type: "booking",
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Upcoming Event Reminder",
    message: "'Creative Design Workshop' starts tomorrow at 10:00 AM. Don't forget!",
    type: "reminder",
    isRead: false,
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
  },
  {
    id: "3",
    title: "Welcome to EventSphere",
    message: "Thanks for joining us! Discover and book your favorite events today.",
    type: "system",
    isRead: true,
    createdAt: new Date(Date.now() - 604800000).toISOString(), // 7 days ago
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "booking": return <Ticket className="h-5 w-5 text-emerald-500" />;
      case "reminder": return <Clock className="h-5 w-5 text-amber-500" />;
      default: return <Bell className="h-5 w-5 text-blue-500" />;
    }
  };

  const getIconBg = (type: string) => {
    switch (type) {
      case "booking": return "bg-emerald-100";
      case "reminder": return "bg-amber-100";
      default: return "bg-blue-100";
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading text-slate-100">Notifications</h1>
          <p className="text-slate-400 text-sm mt-1">Stay updated with your bookings and events.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="bg-[#0F172A] rounded-2xl border border-slate-800 overflow-hidden shadow-sm divide-y divide-slate-800">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id}
              onClick={() => markAsRead(notification.id)}
              className={`p-5 flex gap-4 cursor-pointer transition-colors ${notification.isRead ? "hover:bg-slate-800/40" : "bg-indigo-500/[0.04] hover:bg-indigo-500/[0.08]"}`}
            >
              <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                notification.type === "booking" ? "bg-emerald-500/10" :
                notification.type === "reminder" ? "bg-amber-500/10" :
                "bg-indigo-500/10"
              }`}>
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h4 className={`text-sm font-semibold truncate ${notification.isRead ? "text-slate-400" : "text-slate-100"}`}>
                    {notification.title}
                  </h4>
                  <span className="text-xs text-slate-500 whitespace-nowrap">
                    {new Date(notification.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className={`text-sm leading-snug ${notification.isRead ? "text-slate-500" : "text-slate-300 font-medium"}`}>
                  {notification.message}
                </p>
              </div>
              <div className="shrink-0 flex items-center justify-center w-6">
                {!notification.isRead && (
                  <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Bell className="h-8 w-8 text-slate-600" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-1">All caught up!</h3>
            <p className="text-slate-400 text-sm">You have no new notifications right now.</p>
          </div>
        )}
      </div>
    </div>
  );
}
