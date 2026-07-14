"use client";

import * as React from "react";
import { Search, ChevronDown, MessageCircleQuestion } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { faqs as fallbackFaqs } from "@/data/faqs";
import { getFAQs } from "@/lib/api";
import { cn } from "@/lib/utils";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("All");
  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});
  const [faqs, setFaqs] = React.useState(fallbackFaqs);

  React.useEffect(() => {
    const loadFaqs = async () => {
      try {
        const data = await getFAQs();
        if (data && Array.isArray(data) && data.length > 0) {
          setFaqs(data);
        }
      } catch {
        // Keep fallback FAQs
      }
    };
    loadFaqs();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(faqs.map((faq: any) => faq.category))),
  ];

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = faqs.filter((faq: any) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-muted min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        {/* Header & Search */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageCircleQuestion className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight">
            How can we help?
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Search our knowledge base or browse categories below to find answers
            to common questions.
          </p>

          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for answers..."
              className="pl-12 h-14 rounded-2xl text-lg shadow-sm border-border bg-card"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === category
                  ? "bg-primary text-white shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-semibold text-foreground pr-8">
                    {faq.question}
                  </span>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0 transition-transform duration-200",
                      openItems[faq.id]
                        ? "rotate-180 bg-primary/10 text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </button>
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    openItems[faq.id]
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0",
                  )}
                >
                  <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-border pt-4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-card rounded-2xl border border-border">
              <MessageCircleQuestion className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your search query or category filter.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>

        {/* Still need help */}
        <div className="mt-16 bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10">
          <h3 className="text-2xl font-bold font-heading mb-4">
            Still have questions?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Can't find the answer you're looking for? Our friendly team is here
            to help you out.
          </p>
          <Button size="lg" className="rounded-full px-8">
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
