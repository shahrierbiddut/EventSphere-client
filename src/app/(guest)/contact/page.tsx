"use client"

import * as React from "react"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent successfully! (Demo)")
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">Get In Touch</h1>
          <p className="text-lg text-gray-600">
            Have questions about hosting an event or need help with a ticket? Our team is here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Contact Information (Left side) */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold font-heading mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-1">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Our Location</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      123 Event Avenue, Tech District<br />
                      Dhaka 1212, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0 mt-1">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone Number</h4>
                    <p className="text-gray-600 text-sm">
                      +880 1234-567890<br />
                      +880 9876-543210 (Support)
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-1">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Address</h4>
                    <p className="text-gray-600 text-sm">
                      hello@eventsphere.com<br />
                      support@eventsphere.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0 mt-1">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-gray-600 text-sm">
                      Sunday - Thursday<br />
                      09:00 AM - 06:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-8 border-gray-100" />

              <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors border border-gray-200">
                  <span className="font-bold text-sm">FB</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors border border-gray-200">
                  <span>X</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors border border-gray-200">
                  <span className="font-bold text-sm">IG</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-colors border border-gray-200">
                  <span className="font-bold text-sm">IN</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form & Map (Right side) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold font-heading mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">First Name</label>
                    <Input placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Last Name</label>
                    <Input placeholder="Doe" required />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Email Address</label>
                    <Input type="email" placeholder="john@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Phone Number</label>
                    <Input type="tel" placeholder="+880 1XXX-XXXXXX" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subject</label>
                  <Input placeholder="How can we help you?" required />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Message</label>
                  <Textarea placeholder="Write your message here..." className="min-h-[150px] resize-none" required />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto h-12 px-8">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </div>

            {/* Google Map Placeholder */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 h-[300px] relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop" 
                alt="Map" 
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-blue-900/10 rounded-xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 font-semibold">
                <MapPin className="h-5 w-5 text-primary" /> EventSphere HQ
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
