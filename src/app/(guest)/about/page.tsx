"use client"

import * as React from "react"
import { Users, Target, Heart, Shield, Globe, Zap, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight">
            Connecting people through <span className="text-primary">unforgettable experiences.</span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            EventSphere is the world's leading event management platform. We empower creators to host incredible events and attendees to discover their next passion.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop" 
                alt="EventSphere Team" 
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-bold font-heading text-gray-900">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2024, EventSphere started with a simple idea: making it easier for people to come together. We noticed that event organizers struggled with disjointed tools, and attendees found it hard to discover quality events in their area.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We built EventSphere to bridge that gap. Today, we're proud to serve thousands of organizers and millions of attendees worldwide, powering everything from local workshops to international tech summits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-primary/10 relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To democratize event creation and discovery by providing a powerful, accessible, and intuitive platform that brings communities together.
              </p>
            </div>
            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-secondary/10 relative overflow-hidden group hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                To become the global standard for event experiences, where every meaningful gathering is powered by EventSphere technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold font-heading mb-12">Our Core Values</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: "Community First", desc: "We build for people. Everything we do serves to strengthen connections." },
              { icon: Shield, title: "Trust & Safety", desc: "We prioritize secure transactions and reliable experiences above all." },
              { icon: Zap, title: "Innovation", desc: "We constantly push boundaries to make event management easier." },
              { icon: Heart, title: "Passion", desc: "We love what we do, and it reflects in the platform we build." }
            ].map((value, i) => (
              <div key={i} className="flex flex-col items-center p-6 text-center">
                <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-gray-900 mb-6 shadow-sm border border-gray-100">
                  <value.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{value.title}</h4>
                <p className="text-gray-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-900 text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Join the EventSphere Journey</h2>
          <p className="text-xl text-gray-400 mb-10">Whether you're looking to attend your next favorite event or host one yourself, we're here to help.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="rounded-full px-8">Create an Account</Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-gray-600 text-white hover:bg-white hover:text-black">
              Explore Events
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
