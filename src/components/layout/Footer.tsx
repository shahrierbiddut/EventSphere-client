import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand & About */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary text-white">
                <span className="font-bold text-lg leading-none">E</span>
              </div>
              <span className="font-heading font-bold text-xl text-white tracking-tight">EventSphere</span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm">
              Discover, create, manage, and experience events seamlessly. Join the community of event enthusiasts and creators making memories around the globe.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/share/1Er8DaKmmf/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#1877F2] transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/shahrier_hossain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://linkedin.com/in/shahrier-hossain-biddut" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="https://github.com/shahrierbiddut" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://wa.me/qr/WYIBBSODTPF4E1" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#25D366] transition-colors">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Latest Blogs</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Explore */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold tracking-wide">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/explore" className="hover:text-primary transition-colors">All Events</Link></li>
              <li><Link href="/explore?category=Technology" className="hover:text-primary transition-colors">Technology</Link></li>
              <li><Link href="/explore?category=Music" className="hover:text-primary transition-colors">Music & Concerts</Link></li>
              <li><Link href="/explore?category=Business" className="hover:text-primary transition-colors">Business & Seminars</Link></li>
              <li><Link href="/explore?category=Sports" className="hover:text-primary transition-colors">Sports & Wellness</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-white font-semibold tracking-wide">Contact Info</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>123 Event Avenue, Tech District<br />Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span>hello@eventsphere.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Bottom */}
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-1/3">
            <form className="flex gap-2 w-full max-w-md" action="#">
              <Input 
                type="email" 
                placeholder="Subscribe to newsletter..." 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-primary"
              />
              <Button type="submit" variant="default" className="shrink-0">Subscribe</Button>
            </form>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} EventSphere. All rights reserved.</p>
            <span className="hidden sm:inline-block">•</span>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
