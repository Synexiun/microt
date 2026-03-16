"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

export default function ConsentQRSection() {
  const [consentUrl, setConsentUrl] = useState(
    "https://velvetbrowstudio.com/consent"
  );

  useEffect(() => {
    setConsentUrl(`${window.location.origin}/consent`);
  }, []);

  // White bg + dark code = most reliable scanning
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&bgcolor=ffffff&color=0A0A0A&margin=12&data=${encodeURIComponent(consentUrl)}`;

  return (
    <section className="py-16 md:py-20 bg-dark border-t border-dark-lighter">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="up">
          <div className="rounded-2xl border border-gold/20 bg-dark-light overflow-hidden" suppressHydrationWarning>
            <div className="flex flex-col md:flex-row items-center gap-0">
              {/* QR Column */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center p-8 md:p-10 border-b md:border-b-0 md:border-r border-dark-lighter w-full md:w-auto">
                {/* White framed QR for maximum scan reliability */}
                <div className="rounded-xl overflow-hidden shadow-glow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={qrSrc}
                    alt="Consent Form QR Code"
                    width={160}
                    height={160}
                    className="block"
                  />
                </div>
                <p className="mt-3 text-gray-500 text-xs uppercase tracking-wider text-center">
                  Scan with your phone
                </p>
              </div>

              {/* Text Column */}
              <div className="flex-1 p-8 md:p-10">
                <p className="text-gold text-xs uppercase tracking-[0.2em] font-semibold mb-2">
                  Before Your Appointment
                </p>
                <h3 className="font-heading text-2xl md:text-3xl text-white mb-3">
                  Complete Your Consent Form
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  Save time at the studio by completing your client intake and
                  consent form in advance. Scan the QR code with your phone, or
                  tap the button below to open the form.
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/consent"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gold-gradient text-black font-semibold uppercase tracking-widest text-xs rounded hover:shadow-glow transition-shadow duration-300"
                  >
                    Open Consent Form
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </Link>
                  <p className="text-gray-600 text-xs self-center hidden sm:block">
                    or scan the QR code →
                  </p>
                </div>

                <p className="mt-4 text-gray-600 text-xs font-mono">
                  {consentUrl}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
