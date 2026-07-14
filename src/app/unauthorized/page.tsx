import Link from "next/link";
import { ShieldOff } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl shadow-xl p-10 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldOff size={40} className="text-rose-500" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-3">403</h1>
        <h2 className="text-xl font-semibold text-foreground mb-3">Access Denied</h2>
        <p className="text-muted-foreground mb-8">
          You don&apos;t have permission to access this page. This area is restricted to administrators only.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
