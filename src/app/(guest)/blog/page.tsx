"use client";

import * as React from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { blogPosts as fallbackBlogPosts } from "@/data/blogPosts";
import { getBlogs } from "@/lib/api";

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = React.useState(fallbackBlogPosts);

  React.useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getBlogs();
        if (data && Array.isArray(data) && data.length > 0) {
          setBlogPosts(data);
        }
      } catch {
        // Keep fallback blogs
      }
    };
    loadBlogs();
  }, []);

  const featuredPost = blogPosts[0];
  const latestPosts = blogPosts.slice(1);

  const categories = Array.from(
    new Set(blogPosts.map((post: any) => post.category)),
  );

  return (
    <div className="bg-muted min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            EventSphere Blog
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 tracking-tight">
            Insights, news, and tips for event creators.
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about hosting successful events,
            engaging attendees, and growing your community.
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="bg-card rounded-3xl overflow-hidden shadow-sm border border-border flex flex-col lg:flex-row transition-all duration-300 hover:shadow-xl">
                <div className="lg:w-3/5 h-64 lg:h-auto relative overflow-hidden">
                  <img
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 text-primary shadow-sm backdrop-blur-sm">
                      Featured
                    </Badge>
                  </div>
                </div>

                <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="text-primary font-medium">
                      {featuredPost.category}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" /> {featuredPost.date}
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold font-heading text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-muted-foreground leading-relaxed mb-8">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author?.avatarUrl || "https://ui-avatars.com/api/?name=Author"}
                        alt={featuredPost.author?.name || "Author"}
                        className="w-10 h-10 rounded-full border border-border"
                      />
                      <div>
                        <p className="font-semibold text-sm text-foreground">
                          {featuredPost.author?.name || "Author"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {featuredPost.readTime}
                        </p>
                      </div>
                    </div>

                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-10">
            <h3 className="text-2xl font-bold font-heading mb-6">
              Latest Articles
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-primary shadow-sm backdrop-blur-sm">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h4 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="pt-8 text-center">
              <Button variant="outline" size="lg" className="rounded-full px-8">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-10">
            {/* Search Box */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h4 className="font-bold text-foreground mb-4">Search Blog</h4>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-9 bg-muted border-transparent focus:bg-card focus:border-primary"
                />
              </div>
            </div>

            {/* Categories Box */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-primary" /> Categories
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, i) => (
                  <Badge
                    key={i}
                    variant="secondary"
                    className="hover:bg-primary hover:text-white cursor-pointer px-3 py-1 text-sm font-normal"
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-card rounded-2xl p-6 shadow-sm border border-border">
              <h4 className="font-bold text-foreground mb-6">Popular Posts</h4>
              <div className="space-y-6">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex gap-4 items-start"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div>
                      <h5 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm line-clamp-2 leading-snug mb-1">
                        {post.title}
                      </h5>
                      <span className="text-xs text-muted-foreground">
                        {post.date}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-primary rounded-2xl p-6 shadow-sm text-white text-center">
              <h4 className="font-bold mb-2">Subscribe to our Newsletter</h4>
              <p className="text-primary-foreground/80 text-sm mb-6">
                Get the latest insights delivered straight to your inbox.
              </p>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
                />
                <Button variant="secondary" className="w-full">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
