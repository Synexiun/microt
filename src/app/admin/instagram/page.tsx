"use client";

import React, { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Spinner from "@/components/ui/Spinner";
import type { InstagramPost } from "@/types";

export default function InstagramPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  async function fetchPosts() {
    try {
      const res = await fetch("/api/instagram");
      if (res.ok) {
        const data: InstagramPost[] = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Error fetching instagram posts:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    // Basic URL validation
    try {
      new URL(url.trim());
    } catch {
      setError("Please enter a valid URL.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (res.ok) {
        setUrl("");
        await fetchPosts();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to add post.");
      }
    } catch {
      setError("An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/instagram?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        await fetchPosts();
      }
    } catch (err) {
      console.error("Error deleting instagram post:", err);
    } finally {
      setDeletingId(null);
    }
  }

  function truncateUrl(urlStr: string, maxLen = 60): string {
    if (urlStr.length <= maxLen) return urlStr;
    return urlStr.substring(0, maxLen) + "...";
  }

  return (
    <div className="space-y-6">
      {/* Add Instagram Post */}
      <Card padding="md">
        <h3 className="text-lg font-heading text-white mb-4">
          Add Instagram Post
        </h3>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="url"
                placeholder="https://www.instagram.com/p/..."
                value={url}
                onChange={(e) => {
                  setUrl((e.target as HTMLInputElement).value);
                  setError("");
                }}
                error={error || undefined}
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
              className="sm:self-start"
            >
              {submitting ? "Adding..." : "Add"}
            </Button>
          </div>
        </form>
      </Card>

      {/* Posts list */}
      <Card padding="sm">
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-lg font-heading text-white">
            Saved Posts
            {!loading && (
              <span className="text-sm text-gray-500 font-body ml-2">
                ({posts.length})
              </span>
            )}
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <Spinner size="lg" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500 font-body">
            No Instagram posts added yet.
          </div>
        ) : (
          <div className="divide-y divide-dark-lighter">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between px-4 py-3 hover:bg-dark/50 transition-colors duration-150"
              >
                <div className="min-w-0 flex-1 mr-4">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gold hover:text-gold-light transition-colors duration-200 truncate block"
                    title={post.url}
                  >
                    {truncateUrl(post.url)}
                  </a>
                  <p className="text-xs text-gray-500 mt-1">
                    Added {format(parseISO(post.addedAt), "MMM d, yyyy")}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={deletingId === post.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors duration-200 disabled:opacity-50 flex-shrink-0"
                >
                  {deletingId === post.id ? (
                    <Spinner size="sm" />
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
