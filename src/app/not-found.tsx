import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/Button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-card flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-xl mx-auto">
        <div className="mb-8 relative inline-block">
          {/* Abstract 404 Illustration */}
          <div className="text-[150px] md:text-[200px] font-black font-heading leading-none text-gray-100 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-primary/10 rounded-full flex items-center justify-center animate-pulse-glow">
              <Search className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            </div>
          </div>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
          Oops! Page not found
        </h1>
        
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="h-12 px-8 rounded-full">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" /> Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full border-gray-300">
            <Link href="/explore">
              Explore Events <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
