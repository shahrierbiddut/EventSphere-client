"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Eye, EyeOff, CircleCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((current) => ({ ...current, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiRequest<{
        token: string;
        user: { id: string; name: string; email: string; role: string; photoUrl?: string };
      }>("/api/auth/login", {
        method: "POST",
        body: formData,
      });

      login(response.token, response.user);
      if (response.user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };


  const handleDemoLogin = () => {
    setFormData({ email: "demo@eventsphere.com", password: "password123" });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Column - Form */}
      <div className="w-full md:w-1/2 lg:w-[40%] flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-24 relative z-10">
        <Link
          href="/"
          className="absolute top-8 left-8 sm:left-12 flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="max-w-md w-full mx-auto space-y-8">
          <div className="space-y-2">
            <Link href="/" className="flex items-center gap-2 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                <span className="font-bold leading-none">E</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">
                EventSphere
              </span>
            </Link>
            <h1 className="text-3xl font-bold font-heading tracking-tight text-gray-900">
              Welcome back
            </h1>
            <p className="text-gray-500">
              Enter your details to access your account.
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="bg-red-50">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="pl-10 h-12"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  Password
                </label>
                <Link
                  href="#"
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700"
              >
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="h-11" type="button">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="h-11"
              type="button"
              onClick={handleDemoLogin}
            >
              Demo Login
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:text-primary/80"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right Column - Image/Brand */}
      <div className="hidden md:block w-1/2 lg:w-[60%] bg-zinc-900 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1600&auto=format&fit=crop"
          alt="Concert Crowd"
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900/90 via-purple-900/80 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-24 text-white">
          <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6 leading-tight max-w-xl">
            Discover. Create. Manage. <br />
            <span className="text-indigo-300">
              Experience Events Seamlessly.
            </span>
          </h2>

          <div className="space-y-6 mt-8 max-w-md">
            {[
              "Find amazing events tailored to your interests",
              "Book your seat with a secure 1-click checkout",
              "Manage your bookings in one central dashboard",
              "Get real-time updates & personalized reminders",
            ].map((text, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
                  <CircleCheck className="h-4 w-4 text-indigo-300" />
                </div>
                <p className="text-gray-200 leading-relaxed pt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
