"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ConsentQRPage() {
  const [url, setUrl] = useState("https://velvetbrowstudio.com/consent");

  useEffect(() => {
    setUrl(`${window.location.origin}/consent`);
  }, []);

  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&bgcolor=0A0A0A&color=C9A96E&data=${encodeURIComponent(url)}`;

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center py-16 px-4">
      <div className="max-w-sm w-full">
        {/* Printable card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-dark-light border border-dark-lighter rounded-2xl p-8 text-center"
          id="qr-card"
        >
          {/* Studio name */}
          <h1 className="font-heading text-2xl text-white mb-1">
            Velvet Brow Studio
          </h1>
          <p className="text-gold text-xs uppercase tracking-[0.2em] mb-8">
            Where Precision Meets Beauty
          </p>

          {/* QR Code */}
          <div className="flex justify-center mb-6">
            <div className="p-3 rounded-xl border border-dark-lighter bg-dark inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrSrc}
                alt="Consent Form QR Code"
                width={200}
                height={200}
                className="block"
              />
            </div>
          </div>

          {/* Helper text */}
          <p className="text-white font-heading text-lg mb-2">
            Complete Your Consent Form
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Scan here to complete your consultation and consent form before
            treatment.
          </p>

          {/* URL */}
          <p className="text-gold/70 text-xs font-mono break-all">{url}</p>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3 mt-6 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 border border-gold/40 text-gold hover:bg-gold/10 rounded text-sm font-semibold uppercase tracking-widest transition-all duration-300"
          >
            Print QR Card
          </button>
          <a
            href="/consent"
            className="flex-1 py-3 bg-gold-gradient text-black rounded text-sm font-semibold uppercase tracking-widest hover:shadow-glow transition-shadow duration-300 text-center"
          >
            Open Form
          </a>
        </div>

        <p className="text-center text-gray-600 text-xs mt-6 print:hidden">
          Print this page and display it in your studio for walk-in clients.
        </p>
      </div>

      <style jsx global>{`
        @media print {
          body {
            background: #fff !important;
          }
          #qr-card {
            border: 1px solid #ccc;
            color: #000;
          }
        }
      `}</style>
    </div>
  );
}
