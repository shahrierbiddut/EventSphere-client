"use client";

import { useState } from "react";
import { useAuth } from "@/lib/AuthContext";
import { Save, ShieldAlert, KeyRound, Bell, User } from "lucide-react";

export default function AdminSettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your account and platform preferences.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row min-h-[600px]">
        {/* Settings Navigation */}
        <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 p-4">
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "profile" 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User size={18} />
              Profile Details
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "security" 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <KeyRound size={18} />
              Security
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === "notifications" 
                  ? "bg-indigo-600 text-white" 
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Bell size={18} />
              Notifications
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 md:p-8">
          {activeTab === "profile" && (
            <div className="max-w-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Profile Details</h2>
                <p className="text-sm text-gray-500 mt-1">This information is visible only to other admins.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "A"}
                </div>
                <div>
                  <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">
                    Change Avatar
                  </button>
                  <p className="text-xs text-gray-400 mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl cursor-not-allowed text-sm"
                  />
                  <p className="text-xs text-gray-400">Email cannot be changed for admin accounts.</p>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input
                    type="text"
                    defaultValue="Administrator"
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 text-gray-500 rounded-xl cursor-not-allowed text-sm font-medium"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Security Settings</h2>
                <p className="text-sm text-gray-500 mt-1">Update your password and secure your account.</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold text-gray-900 border-b border-gray-100 pb-2">Change Password</h3>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all text-sm"
                  />
                </div>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors mt-2">
                  Update Password
                </button>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <h3 className="text-sm font-bold text-rose-600 mb-2 flex items-center gap-2">
                  <ShieldAlert size={16} /> Danger Zone
                </h3>
                <p className="text-xs text-gray-500 mb-4">
                  Permanently delete your admin account. This action cannot be undone.
                </p>
                <button disabled className="px-4 py-2 bg-rose-50 text-rose-600 font-medium rounded-xl border border-rose-100 cursor-not-allowed opacity-50">
                  Delete Account
                </button>
                <p className="text-[10px] text-gray-400 mt-2">Disabled for root administrator.</p>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="max-w-xl space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Notification Preferences</h2>
                <p className="text-sm text-gray-500 mt-1">Choose what you want to be notified about.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm font-bold text-gray-900">New User Registrations</p>
                    <p className="text-xs text-gray-500 mt-0.5">Receive a daily digest of new users.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm font-bold text-gray-900">New Contact Messages</p>
                    <p className="text-xs text-gray-500 mt-0.5">Get instantly notified when someone uses the contact form.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm font-bold text-gray-900">System Alerts</p>
                    <p className="text-xs text-gray-500 mt-0.5">Crucial alerts about platform health and errors.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked disabled />
                    <div className="w-11 h-6 bg-indigo-600 rounded-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:translate-x-full opacity-60"></div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors">
                  <Save size={18} />
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
