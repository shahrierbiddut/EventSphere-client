"use client";

import { useEffect, useState } from "react";
import { Tag, Plus, Edit, Trash2 } from "lucide-react";
import { apiRequest } from "@/lib/api";

interface Category {
  name: string;
  eventCount: number;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<Category[]>("/api/admin/categories")
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Categories are dynamically pulled from existing events.</p>
        </div>
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600/50 text-white text-sm font-medium rounded-xl cursor-not-allowed"
          title="Categories are dynamically generated from events in this version"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm animate-pulse h-24" />
          ))
        ) : categories.length === 0 ? (
          <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
            No categories found. Create an event to generate a category.
          </div>
        ) : (
          categories.map((cat, index) => (
            <div key={index} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <Tag size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 capitalize">{cat.name || "Uncategorized"}</h3>
                  <p className="text-xs text-gray-500">{cat.eventCount} event{cat.eventCount !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg" disabled>
                  <Edit size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-sm text-amber-800">
        <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0 font-bold">i</div>
        <p>In this version of EventSphere, categories are purely dynamic based on the <code className="bg-amber-100 px-1 rounded">category</code> string assigned to events. When you create or edit an event, typing a new category will automatically create it here.</p>
      </div>
    </div>
  );
}
