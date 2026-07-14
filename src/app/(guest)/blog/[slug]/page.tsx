"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Share2, Copy } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { blogPosts as fallbackBlogPosts } from "@/data/blogPosts";
import { getBlogBySlug, getBlogs } from "@/lib/api";

export default function BlogDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const [slug, setSlug] = React.useState<string | null>(null);
  const [post, setPost] = React.useState(fallbackBlogPosts[0]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setSlug(params?.slug || "10-tips-hosting-tech-conference");
  }, [params]);

  React.useEffect(() => {
    const loadBlog = async () => {
      if (!slug) return;

      try {
        // Try to fetch from API first
        const data = await getBlogBySlug(slug);
        if (data) {
          setPost(data);
        } else {
          // Fallback to mock data
          const found = fallbackBlogPosts.find((p) => p.slug === slug);
          if (found) setPost(found);
        }
      } catch {
        // Fallback to mock data on error
        const found = fallbackBlogPosts.find((p) => p.slug === slug);
        if (found) setPost(found);
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [slug]);

  if (isLoading) return <div className="p-20 text-center">Loading...</div>;
  if (!post) return <div className="p-20 text-center">Article not found</div>;

  return (
    <div className="bg-card min-h-screen pb-20">
      {/* Hero Header */}
      <div className="bg-muted pt-20 pb-12 border-b border-border">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <Link
            href="/blog"
            className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors text-sm font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to all articles
          </Link>

          <div className="text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              {post.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              {post.excerpt}
            </p>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full border border-border"
                />
                <span className="font-medium text-foreground">
                  {post.author.name}
                </span>
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {post.date}
              </div>
              <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" /> {post.readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-4 md:px-6 max-w-5xl -mt-8 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-xl border border-border bg-card">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[400px] md:h-[500px] object-cover"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl mt-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <article className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
              <p className="lead text-xl text-muted-foreground mb-8">
                {post.content}
              </p>

              {/* Dummy content to make it look full */}
              <h2>Understanding Your Audience</h2>
              <p>
                The first step in planning any successful event is knowing
                exactly who you are building it for. A tech conference aimed at
                senior developers will have vastly different requirements than
                one designed for early-stage startup founders.
              </p>
              <ul>
                <li>
                  Send out pre-event surveys to gauge interest in specific
                  topics.
                </li>
                <li>
                  Analyze data from past events to see which sessions had the
                  highest attendance.
                </li>
                <li>
                  Create detailed attendee personas to guide your marketing and
                  programming decisions.
                </li>
              </ul>

              <blockquote>
                "An event is not just a gathering of people; it's a carefully
                curated experience designed to inspire, educate, and connect."
              </blockquote>

              <h2>Choosing the Right Technology Stack</h2>
              <p>
                In today's hybrid world, the technology you choose to support
                your event is just as important as the physical venue. You need
                a reliable registration system, a robust streaming platform for
                virtual attendees, and an engaging mobile app for on-site
                navigation.
              </p>

              <p>
                Platform like EventSphere can handle the end-to-end process,
                from ticketing to post-event analytics, allowing you to focus on
                what matters most: the content and the attendee experience.
              </p>
            </article>

            <hr className="my-12 border-border" />

            {/* Author Bio Box */}
            <div className="bg-muted rounded-2xl p-8 border border-border flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-sm shrink-0"
              />
              <div>
                <h4 className="text-xl font-bold font-heading mb-2">
                  Written by {post.author.name}
                </h4>
                <p className="text-muted-foreground mb-4">
                  Event marketing specialist with over 10 years of experience
                  organizing large-scale tech conferences across the globe.
                </p>
                <div className="flex justify-center sm:justify-start gap-3">
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-primary shadow-sm"
                  >
                    <span>X</span>
                  </a>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-card flex items-center justify-center text-muted-foreground hover:text-primary shadow-sm"
                  >
                    <span className="font-bold text-sm">IN</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Share */}
          <div className="lg:w-1/4">
            <div className="sticky top-24">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-primary" /> Share this article
              </h4>
              <div className="flex flex-col gap-3">
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground hover:text-[#1877F2] hover:border-[#1877F2]"
                >
                  <span className="mr-3 font-bold">FB</span> Facebook
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground hover:text-[#1DA1F2] hover:border-[#1DA1F2]"
                >
                  <span className="mr-3 font-bold">X</span> Twitter
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground hover:text-[#0A66C2] hover:border-[#0A66C2]"
                >
                  <span className="mr-3 font-bold">IN</span> LinkedIn
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-muted-foreground"
                >
                  <Copy className="mr-3 h-4 w-4" /> Copy Link
                </Button>
              </div>

              <div className="mt-12">
                <h4 className="font-semibold text-foreground mb-4">
                  Related Articles
                </h4>
                <div className="space-y-4">
                  {blogPosts
                    .filter((p) => p.id !== post.id)
                    .slice(0, 2)
                    .map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group block"
                      >
                        <div className="h-32 rounded-lg overflow-hidden mb-2 relative">
                          <img
                            src={relatedPost.imageUrl}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                        <h5 className="font-medium text-sm text-foreground group-hover:text-primary line-clamp-2 leading-tight">
                          {relatedPost.title}
                        </h5>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
