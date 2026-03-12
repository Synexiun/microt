"use client";

import React, { useState, useEffect, useCallback } from "react";
import Modal from "@/components/ui/Modal";

const DISMISS_KEY = "newsletter_dismissed";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const wasDismissedRecently = useCallback(() => {
    try {
      const dismissed = localStorage.getItem(DISMISS_KEY);
      if (!dismissed) return false;
      const timestamp = parseInt(dismissed, 10);
      return Date.now() - timestamp < SEVEN_DAYS_MS;
    } catch {
      return false;
    }
  }, []);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(DISMISS_KEY, Date.now().toString());
    } catch {
      // localStorage unavailable
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (wasDismissedRecently()) return;

    let triggered = false;

    const timer = setTimeout(() => {
      if (!triggered) {
        triggered = true;
        setIsOpen(true);
      }
    }, 15000);

    const handleScroll = () => {
      if (triggered) return;
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (scrollPercent >= 0.5) {
        triggered = true;
        setIsOpen(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [wasDismissedRecently]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to subscribe. Please try again.");
      }

      setStatus("success");
      try {
        localStorage.setItem(DISMISS_KEY, Date.now().toString());
      } catch {
        // localStorage unavailable
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={dismiss}>
      {status === "success" ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold-gradient flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl font-bold text-white mb-2">
            Welcome to the VIP List!
          </h3>
          <p className="text-gray-400">
            You&apos;ll be the first to know about exclusive offers and beauty tips.
          </p>
        </div>
      ) : (
        <div className="text-center py-2">
          <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-gold"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </div>
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2">
            Join Our VIP List
          </h3>
          <p className="text-gray-400 mb-8">
            Get exclusive offers and beauty tips delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="
                w-full px-4 py-3 rounded
                bg-dark border border-dark-lighter
                text-white placeholder-gray-500
                focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30
                transition-colors duration-300
              "
            />
            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMessage}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="
                w-full relative inline-flex items-center justify-center
                bg-gold-gradient px-8 py-3
                text-black font-semibold uppercase tracking-widest text-sm
                rounded overflow-hidden
                transition-shadow duration-300
                hover:shadow-glow
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <span
                className="absolute inset-0 bg-gold-shimmer bg-[length:200%_100%] animate-shimmer"
                aria-hidden="true"
              />
              <span className="relative z-10">
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </span>
            </button>
          </form>
          <p className="text-gray-600 text-xs mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      )}
    </Modal>
  );
}
