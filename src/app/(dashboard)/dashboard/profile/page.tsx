"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { apiRequest } from "@/lib/api";
import { UserProfile } from "@/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Camera, Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user, persistAuth } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoUrlInput, setPhotoUrlInput] = useState<string>("");
  const [isCheckingImage, setIsCheckingImage] = useState(false);
  const [previewBroken, setPreviewBroken] = useState(false);

  const isValidImageUrl = (value: string) => {
    if (!value) return true;
    try {
      const parsed = new URL(value);
      return parsed.protocol === "http:" || parsed.protocol === "https:";
    } catch {
      return false;
    }
  };

  const canLoadImage = (value: string) =>
    new Promise<boolean>((resolve) => {
      if (!value) {
        resolve(true);
        return;
      }

      const testImg = new Image();
      const timer = window.setTimeout(() => {
        resolve(false);
      }, 6000);

      testImg.onload = () => {
        window.clearTimeout(timer);
        resolve(true);
      };

      testImg.onerror = () => {
        window.clearTimeout(timer);
        resolve(false);
      };

      testImg.src = value;
    });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiRequest<UserProfile>("/api/users/me");
        setProfile(data);
        const initialPhoto = data.photoUrl || data.avatarUrl || "";
        setPhotoPreview(initialPhoto);
        setPhotoUrlInput(initialPhoto);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const nextPhotoUrl = photoUrlInput.trim();

    if (!isValidImageUrl(nextPhotoUrl)) {
      setMessage({
        type: "error",
        text: "Please enter a valid image URL (http or https).",
      });
      setIsSaving(false);
      return;
    }

    setIsCheckingImage(true);
    const imageReachable = await canLoadImage(nextPhotoUrl);
    setIsCheckingImage(false);

    if (!imageReachable) {
      setMessage({
        type: "error",
        text: "This link is not a direct image URL. Open the image in a new tab and paste the direct image file link.",
      });
      setIsSaving(false);
      return;
    }

    const updates = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      bio: formData.get("bio") as string,
      address: formData.get("address") as string,
      photoUrl: nextPhotoUrl,
    };

    try {
      const updatedUser = await apiRequest<UserProfile>("/api/users/me", {
        method: "PATCH",
        body: updates,
      });
      setProfile(updatedUser);
      setPhotoUrlInput(updatedUser.photoUrl || "");
      setPreviewBroken(false);
      setPhotoPreview(
        (updatedUser.photoUrl || updatedUser.avatarUrl || "") +
          (updatedUser.photoUrl ? `?v=${Date.now()}` : ""),
      );
      // Update the user in AuthContext/LocalStorage so header avatar updates if name changed
      const token = window.localStorage.getItem("eventsphere_token");
      if (token) {
        persistAuth(token, updatedUser);
      }
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error: any) {
      setMessage({
        type: "error",
        text: error.message || "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-2xl w-full"></div>
        <div className="h-96 bg-gray-200 rounded-2xl w-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold font-heading text-slate-100">
          My Profile
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Manage your personal information.
        </p>
      </div>

      <div className="bg-[#0F172A] rounded-2xl border border-slate-800 overflow-hidden shadow-sm">
        {/* Banner */}
        <div className="h-32 bg-linear-to-r from-indigo-900/50 to-indigo-800/50 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="relative group">
              <img
                src={
                  !previewBroken && photoPreview
                    ? photoPreview
                    : profile?.photoUrl ||
                      profile?.avatarUrl ||
                      "https://ui-avatars.com/api/?name=" +
                        encodeURIComponent(profile?.name || "User")
                }
                alt={profile?.name}
                className="w-24 h-24 rounded-full border-4 border-[#0F172A] object-cover bg-slate-800"
                onError={() => setPreviewBroken(true)}
              />
              <button
                type="button"
                onClick={() => {
                  const input = document.getElementById(
                    "photoUrl",
                  ) as HTMLInputElement | null;
                  input?.focus();
                }}
                className="absolute inset-0 bg-black/60 text-white rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="h-5 w-5 mb-1" />
                <span className="text-[10px] font-medium">URL</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-16 p-8">
          {message && (
            <div
              className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === "success" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-slate-300"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={profile?.name}
                  required
                  className="bg-slate-900/50 border-slate-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-300"
                >
                  Email Address{" "}
                  <span className="text-slate-500 font-normal">
                    (Read-only)
                  </span>
                </label>
                <Input
                  id="email"
                  defaultValue={profile?.email}
                  disabled
                  className="bg-slate-800 border-slate-700 text-slate-500 cursor-not-allowed"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-slate-300"
                >
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={profile?.phone}
                  placeholder="+1 (555) 000-0000"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-slate-300"
                >
                  Address / Location
                </label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={profile?.address}
                  placeholder="City, Country"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label
                  htmlFor="photoUrl"
                  className="text-sm font-medium text-slate-300"
                >
                  Profile Photo URL
                </label>
                <Input
                  id="photoUrl"
                  name="photoUrl"
                  value={photoUrlInput}
                  onChange={(e) => {
                    setPhotoUrlInput(e.target.value);
                    setPreviewBroken(false);
                    setPhotoPreview(e.target.value);
                  }}
                  placeholder="https://example.com/my-photo.jpg"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder-slate-600"
                />
                <p className="text-[11px] text-slate-500">
                  Use a direct image link (jpg, png, webp). Page links from
                  image-hosting sites may not render.
                </p>
                {isCheckingImage && (
                  <p className="text-[11px] text-indigo-300">
                    Checking image URL...
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="bio"
                className="text-sm font-medium text-slate-300"
              >
                Short Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                defaultValue={profile?.bio}
                placeholder="Tell us a bit about yourself..."
                className="w-full rounded-lg border border-slate-700 bg-slate-900/50 px-3 py-2 text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent transition-all resize-none"
              ></textarea>
            </div>

            <div className="pt-4 flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white border-none shadow-sm shadow-indigo-600/20"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
