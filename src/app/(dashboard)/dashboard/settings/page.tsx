"use client";

import { useState } from "react";
import { apiRequest } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save, Loader2, ShieldAlert } from "lucide-react";

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      setIsSaving(false);
      return;
    }

    try {
      await apiRequest("/api/users/me/password", {
        method: "PATCH",
        body: { currentPassword, newPassword },
      });
      setMessage({ type: "success", text: "Password updated successfully!" });
      (e.target as HTMLFormElement).reset();
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to update password." });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-100">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your account preferences and security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-lg font-bold text-gray-900">Security</h2>
          <p className="text-sm text-gray-500 mt-1">Update your password to keep your account secure.</p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-[#0F172A] rounded-2xl border border-slate-800 p-6 shadow-sm">
            {message && (
              <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${
                message.type === "success" 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Current Password</label>
                <Input type="password" name="currentPassword" required className="bg-slate-900/50 border-slate-700 text-white" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">New Password</label>
                  <Input type="password" name="newPassword" required minLength={6} className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300">Confirm New Password</label>
                  <Input type="password" name="confirmPassword" required minLength={6} className="bg-slate-900/50 border-slate-700 text-white" />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" disabled={isSaving} className="bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-sm">
                  {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800"></div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <h2 className="text-lg font-bold text-rose-500">Danger Zone</h2>
          <p className="text-sm text-slate-400 mt-1">Permanently delete your account and all associated data.</p>
        </div>

        <div className="md:col-span-2">
          <div className="bg-rose-500/5 rounded-2xl border border-rose-500/10 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-rose-400">Delete Account</h3>
              <p className="text-sm text-rose-400/70 mt-1">Once you delete your account, there is no going back.</p>
            </div>
            <Button variant="outline" className="text-rose-400 border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-300 shrink-0">
              <ShieldAlert className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
